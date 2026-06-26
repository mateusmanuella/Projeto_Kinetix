package com.kinetix.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PlanoExercicioResponseDTO {
    private Long id;
    private String nomeExercicio;
    private String descricaoExercicio;
    private Integer series;
    private Integer repeticoes;
    private Integer tempoExecucao;
}