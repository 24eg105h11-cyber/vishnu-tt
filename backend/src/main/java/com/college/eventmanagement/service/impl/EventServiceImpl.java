package com.college.eventmanagement.service.impl;

import com.college.eventmanagement.dto.EventDTO;
import com.college.eventmanagement.exception.BadRequestException;
import com.college.eventmanagement.exception.ResourceNotFoundException;
import com.college.eventmanagement.model.Club;
import com.college.eventmanagement.model.Event;
import com.college.eventmanagement.repository.ClubRepository;
import com.college.eventmanagement.repository.EventRepository;
import com.college.eventmanagement.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventServiceImpl implements EventService {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private ClubRepository clubRepository;

    @Override
    public List<Event> getAllApprovedEvents() {
        return eventRepository.findByStatusOrderByCreatedAtDesc("APPROVED");
    }

    @Override
    public List<Event> searchAndFilterEvents(String search, String category, String club, String sort) {
        List<Event> events;

        if (search != null && !search.trim().isEmpty()) {
            events = eventRepository.searchEvents(search.trim());
        } else if (category != null && !category.trim().isEmpty()) {
            events = eventRepository.findByCategory(category.trim());
        } else if (club != null && !club.trim().isEmpty()) {
            events = eventRepository.findByClubId(club.trim());
        } else {
            events = eventRepository.findAll();
        }

        // Filter approved only for general search
        events = events.stream()
                .filter(e -> "APPROVED".equalsIgnoreCase(e.getStatus()))
                .collect(Collectors.toList());

        // Sort options
        if ("popular".equalsIgnoreCase(sort)) {
            events.sort((a, b) -> Integer.compare(b.getRegisteredCount(), a.getRegisteredCount()));
        } else if ("upcoming".equalsIgnoreCase(sort)) {
            events.sort(Comparator.comparing(Event::getDate));
        } else { // default recently added
            events.sort((a, b) -> b.getCreatedAt().compareTo(a.getCreatedAt()));
        }

        return events;
    }

    @Override
    public Event getEventById(String id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event", "id", id));
    }

    @Override
    public Event createEvent(EventDTO dto, String organizerUserId) {
        Club club = null;
        if (dto.getClubId() != null && !dto.getClubId().isEmpty()) {
            club = clubRepository.findById(dto.getClubId()).orElse(null);
        }

        Event event = Event.builder()
                .title(dto.getTitle())
                .clubId(dto.getClubId())
                .clubName(club != null ? club.getName() : dto.getClubName())
                .clubLogoUrl(club != null ? club.getLogoUrl() : "")
                .category(dto.getCategory())
                .description(dto.getDescription())
                .posterUrl(dto.getPosterUrl())
                .date(dto.getDate())
                .startTime(dto.getStartTime())
                .endTime(dto.getEndTime())
                .venue(dto.getVenue())
                .maxCapacity(dto.getMaxCapacity() > 0 ? dto.getMaxCapacity() : 100)
                .rules(dto.getRules())
                .eligibility(dto.getEligibility())
                .organizerUserId(organizerUserId)
                .contactEmail(dto.getContactEmail())
                .contactPhone(dto.getContactPhone())
                .status("PENDING") // Requires Admin approval
                .build();

        return eventRepository.save(event);
    }

    @Override
    public Event updateEvent(String id, EventDTO dto, String organizerUserId) {
        Event event = getEventById(id);
        
        event.setTitle(dto.getTitle());
        event.setCategory(dto.getCategory());
        event.setDescription(dto.getDescription());
        if (dto.getPosterUrl() != null && !dto.getPosterUrl().isEmpty()) {
            event.setPosterUrl(dto.getPosterUrl());
        }
        event.setDate(dto.getDate());
        event.setStartTime(dto.getStartTime());
        event.setEndTime(dto.getEndTime());
        event.setVenue(dto.getVenue());
        event.setMaxCapacity(dto.getMaxCapacity());
        if (dto.getRules() != null) event.setRules(dto.getRules());
        event.setEligibility(dto.getEligibility());

        return eventRepository.save(event);
    }

    @Override
    public void deleteEvent(String id, String organizerUserId) {
        Event event = getEventById(id);
        eventRepository.delete(event);
    }

    @Override
    public List<Event> getEventsByClub(String clubId) {
        return eventRepository.findByClubId(clubId);
    }

    @Override
    public List<Event> getEventsByOrganizer(String organizerUserId) {
        return eventRepository.findByOrganizerUserId(organizerUserId);
    }

    @Override
    public List<Event> getPendingEvents() {
        return eventRepository.findByStatus("PENDING");
    }

    @Override
    public Event approveEvent(String id) {
        Event event = getEventById(id);
        event.setStatus("APPROVED");
        return eventRepository.save(event);
    }

    @Override
    public Event rejectEvent(String id) {
        Event event = getEventById(id);
        event.setStatus("REJECTED");
        return eventRepository.save(event);
    }
}
