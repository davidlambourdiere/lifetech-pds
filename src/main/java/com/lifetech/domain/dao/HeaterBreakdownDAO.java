package com.lifetech.domain.dao;

import com.lifetech.domain.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HeaterBreakdownDAO extends JpaRepository<HeaterBreakdown, Long> {
    @Query(value = "SELECT * FROM lifetech.heaterbreakdown GROUP BY iotheaterbreakdown_id", nativeQuery = true)
    List<HeaterBreakdown> findAllHeaterbreakdownGroupByIOTId();
    //List<HeaterBreakdown> findAllHeaterBreakdown();

    //List<ClockBreakdown> findBreakdownByClock(Clock id);

    @Query(value = "SELECT AVG((duration/heater_activity_duration)*100) as mean_breakdown_rate \n" +
            "FROM (SELECT iotheaterbreakdown_id, SUM(ROUND(UNIX_TIMESTAMP(enddateheaterbreakdown) - UNIX_TIMESTAMP(startdateheaterbreakdown))) as duration, ROUND(UNIX_TIMESTAMP(NOW()) - UNIX_TIMESTAMP(heater.activationdate)) as heater_activity_duration\n" +
            "FROM lifetech.heaterbreakdown\n" +
            "JOIN heater ON heater.id = heaterbreakdown.iotheaterbreakdown_id\n" +
            "GROUP BY iotheaterbreakdown_id) as T;", nativeQuery = true)
    String getBreakdownRate();

    @Query(value="SELECT AVG((duration/heater_activity_duration)*100) as mean_breakdown_rate\n" +
            "FROM (SELECT iotheaterbreakdown_id, SUM(ROUND(UNIX_TIMESTAMP(enddateheaterbreakdown) - UNIX_TIMESTAMP(startdateheaterbreakdown))) as duration, ROUND(UNIX_TIMESTAMP(NOW()) - UNIX_TIMESTAMP(heater.activationdate)) as heater_activity_duration\n" +
            "FROM lifetech.heaterbreakdown\n" +
            "JOIN heater ON heater.id = heaterbreakdown.iotheaterbreakdown_id\n" +
            "WHERE heaterbreakdown.startdateheaterbreakdown BETWEEN ?1 AND ?2\n" +
            "GROUP BY iotheaterbreakdown_id) as T;", nativeQuery=true)
    String getBreakdownRateBetween(String startDate, String endDate);

    @Query(value="SELECT AVG((duration/heater_activity_duration)*100) as mean_breakdown_rate\n" +
            "FROM (SELECT iotheaterbreakdown_id, SUM(ROUND(UNIX_TIMESTAMP(enddateheaterbreakdown) - UNIX_TIMESTAMP(startdateheaterbreakdown))) as duration, ROUND(UNIX_TIMESTAMP(NOW()) - UNIX_TIMESTAMP(heater.activationdate)) as heater_activity_duration\n" +
            "FROM lifetech.heaterbreakdown\n" +
            "JOIN heater ON heater.id = heaterbreakdown.iotheaterbreakdown_id\n" +
            "JOIN person ON heater.person_id = person.id\n" +
            "WHERE person.residence_id = ?1\n" +
            "GROUP BY iotheaterbreakdown_id) as T;", nativeQuery=true)
    String getBreakdownRateByResidence(String residenceId);

    @Query(value="SELECT AVG((duration/heater_activity_duration)*100) as mean_breakdown_rate\n" +
            "FROM (SELECT iotheaterbreakdown_id, SUM(ROUND(UNIX_TIMESTAMP(enddateheaterbreakdown) - UNIX_TIMESTAMP(startdateheaterbreakdown))) as duration, ROUND(UNIX_TIMESTAMP(NOW()) - UNIX_TIMESTAMP(heater.activationdate)) as heater_activity_duration\n" +
            "FROM lifetech.heaterbreakdown\n" +
            "JOIN heater ON heater.id = heaterbreakdown.iotheaterbreakdown_id\n" +
            "JOIN person ON heater.person_id = person.id\n" +
            "WHERE person.residence_id = ?1 AND heaterbreakdown.startdateheaterbreakdown BETWEEN ?2 AND ?3\n" +
            "GROUP BY iotheaterbreakdown_id) as T;", nativeQuery=true)
    String getHeaterBreakdownRateByResidenceBetween(String residenceId,String startDate, String endDate);

    @Query(value="SELECT AVG((duration/heater_activity_duration)*100) as mean_breakdown_rate\n" +
            "FROM (SELECT iotheaterbreakdown_id, SUM(ROUND(UNIX_TIMESTAMP(enddateheaterbreakdown) - UNIX_TIMESTAMP(startdateheaterbreakdown))) as duration, ROUND(UNIX_TIMESTAMP(NOW()) - UNIX_TIMESTAMP(heater.activationdate)) as heater_activity_duration\n" +
            "FROM lifetech.heaterbreakdown\n" +
            "JOIN heater ON heater.id = heaterbreakdown.iotheaterbreakdown_id\n" +
            "WHERE heater.person_id = ?1\n" +
            "GROUP BY iotheaterbreakdown_id) as T;", nativeQuery=true)
    String getBreakdownRateByPerson(String personId);

    @Query(value="SELECT AVG((duration/heater_activity_duration)*100) as mean_breakdown_rate\n" +
            "FROM (SELECT iotheaterbreakdown_id, SUM(ROUND(UNIX_TIMESTAMP(enddateheaterbreakdown) - UNIX_TIMESTAMP(startdateheaterbreakdown))) as duration, ROUND(UNIX_TIMESTAMP(NOW()) - UNIX_TIMESTAMP(heater.activationdate)) as heater_activity_duration\n" +
            "FROM lifetech.heaterbreakdown\n" +
            "JOIN heater ON heater.id = heaterbreakdown.iotheaterbreakdown_id\n" +
            "WHERE heater.person_id = ?1 AND heaterbreakdown.startdateheaterbreakdown BETWEEN ?2 AND ?3\n" +
            "GROUP BY iotheaterbreakdown_id) as T;", nativeQuery=true)
    String getHeaterBreakdownRateByPersonBetween(String personId,String startDate, String endDate);

}
