package com.kinetix.service;

import com.kinetix.dto.*;
import com.kinetix.model.*;
import com.kinetix.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PlanoReabilitacaoService {

    private final PlanoReabilitacaoRepository planoRepository;
    private final PacienteRepository pacienteRepository;
    private final FisioterapeutaRepository fisioterapeutaRepository;
    private final ExercicioRepository exercicioRepository;

    @Transactional
    public void criarNovoPlano(Long pacienteId, PlanoReabilitacaoRequestDTO dto) {
        // 1. Finaliza planos ativos anteriores
        planoRepository.finalizarPlanosAtivos(pacienteId);

        // 2. Busca entidades base
        Paciente paciente = pacienteRepository.findById(pacienteId)
                .orElseThrow(() -> new RuntimeException("Paciente não encontrado"));
        Fisioterapeuta fisio = fisioterapeutaRepository.findById(dto.getFisioterapeutaId())
                .orElseThrow(() -> new RuntimeException("Fisioterapeuta não encontrado"));

        // 3. Cria o cabeçalho do plano
        PlanoReabilitacao novoPlano = new PlanoReabilitacao();
        novoPlano.setPaciente(paciente);
        novoPlano.setFisioterapeuta(fisio);
        
        // 4. Mapeia os exercícios
        List<PlanoExercicio> itens = dto.getExercicios().stream().map(exDto -> {
            PlanoExercicio item = new PlanoExercicio();
            item.setPlano(novoPlano);
            item.setExercicio(exercicioRepository.getReferenceById(exDto.getExercicioId()));
            item.setSeries(exDto.getSeries());
            item.setRepeticoes(exDto.getRepeticoes());
            item.setTempoExecucao(exDto.getTempoExecucao());
            return item;
        }).collect(Collectors.toList());

        novoPlano.setExercicios(itens);
        planoRepository.save(novoPlano);
    }

    public PlanoReabilitacaoResponseDTO buscarPlanoAtivo(Long pacienteId) {
        PlanoReabilitacao plano = planoRepository.findFirstByPacienteIdAndStatusOrderByDataCriacaoDesc(pacienteId, "ATIVO")
                .orElseThrow(() -> new RuntimeException("Nenhum plano ativo encontrado"));

        return PlanoReabilitacaoResponseDTO.builder()
                .fisioterapeutaNome(plano.getFisioterapeuta().getUsuario().getNome())
                .exercicios(plano.getExercicios().stream().map(it -> 
                    PlanoExercicioResponseDTO.builder()
                        .id(it.getId())
                        .nomeExercicio(it.getExercicio().getNome())
                        .descricaoExercicio(it.getExercicio().getDescricao())
                        .series(it.getSeries())
                        .repeticoes(it.getRepeticoes())
                        .tempoExecucao(it.getTempoExecucao())
                        .build()).collect(Collectors.toList()))
                .build();
    }
}