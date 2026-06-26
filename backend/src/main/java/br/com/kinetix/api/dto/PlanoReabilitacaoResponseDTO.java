package com.kinetix.dto;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Data
@Builder
public class PlanoReabilitacaoResponseDTO {
    private String fisioterapeutaNome;
    private List<PlanoExercicioResponseDTO> exercicios;
}