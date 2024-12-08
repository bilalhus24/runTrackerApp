package com.example.demo.entity.Run;

import jakarta.persistence.*;
import jakarta.validation.constraints.Positive;
import lombok.*;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "runs")
public class Run {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Positive
    private double miles;

    @Enumerated(EnumType.STRING)
    private Location location;

    private LocalTime time_start;
    private LocalTime time_end;
    private Duration duration;
    private LocalDate date;
    private double averagePace;


    public Run(double miles, Location location, LocalTime start, LocalTime end, long userId, LocalDate date) {
        this.miles = miles;
        this.location = location;
        this.time_start = start;
        this.time_end = end;
        this.userId = userId;
        this.date = date;
        calculateDurationAndPace();
    }

    public void setPace(){
        this.calculateDurationAndPace();
    }

    @PostLoad
    @PostPersist
    @PostUpdate
    private void calculateDurationAndPace() {
        if (time_start != null && time_end != null) {
            this.duration = Duration.between(this.time_start, this.time_end);
        } else {
            this.duration = Duration.ZERO;
        }
        this.averagePace = calculateAveragePace();
    }

    private double calculateAveragePace() {
        // Convert duration to hours
        double hours = duration.toSeconds() / 3600.0;
        if (hours == 0) return 0;

        // Calculate pace and round to 2 decimal places
        BigDecimal pace = BigDecimal.valueOf(miles / hours);
        pace = pace.setScale(3, RoundingMode.HALF_UP);
        return pace.doubleValue();
    }
}