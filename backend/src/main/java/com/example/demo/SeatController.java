
package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/seats")
public class SeatController {

    @GetMapping
    public Map<String, Object> getSeats(
            @RequestParam(defaultValue = "2") int floor) {

        List<Map<String, String>> seats = new ArrayList<>();
        String[] rows = {"A", "B", "C", "D", "E"};
        int free = 0;

        for (int r = 0; r < rows.length; r++) {
            for (int i = 1; i <= 8; i++) {
                String status = (i + r + floor) % 3 == 0
                        ? "taken" : "free";

                if (status.equals("free")) {
                    free++;
                }

                seats.add(Map.of(
                        "id", "F" + floor + "-" + rows[r] + i,
                        "label", rows[r] + "-" + i,
                        "row", rows[r],
                        "status", status
                ));
            }
        }

        return Map.of(
                "floor", floor,
                "free", free,
                "total", seats.size(),
                "seats", seats
        );
    }
}
