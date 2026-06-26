package com.kinetix.dto;

import lombok.Data;

@Data
public class PlanoExercicioDTO {
    private Long exercicioId;
    private Integer series;
    private Integer repeticoes;
    private Integer tempoExecucao;
}