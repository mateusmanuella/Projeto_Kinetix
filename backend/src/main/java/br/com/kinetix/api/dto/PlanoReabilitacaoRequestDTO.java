package com.kinetix.dto;

import lombok.Data;
import java.util.List;
import jakarta.validation.constraints.NotEmpty;

@Data
public class PlanoReabilitacaoRequestDTO {
    private Long fisioterapeutaId;
    @NotEmpty(message = "O plano deve conter ao menos um exercicio.")
    private List<PlanoExercicioDTO> exercicios;
}