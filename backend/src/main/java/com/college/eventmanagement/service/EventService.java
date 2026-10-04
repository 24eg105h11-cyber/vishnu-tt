package com.college.eventmanagement.service;

import com.college.eventmanagement.dto.EventDTO;
import com.college.eventmanagement.model.Event;

import java.util.List;

public interface EventService {
    List<Event> getAllApprovedEvents();
    List<Event> searchAndFilterEvents(String search, String category, String club, String sort);
    Event getEventById(String id);
    Event createEvent(EventDTO eventDTO, String organizerUserId);
    Event updateEvent(String id, EventDTO eventDTO, String organizerUserId);
    void deleteEvent(String id, String organizerUserId);
    List<Event> getEventsByClub(String clubId);
    List<Event> getEventsByOrganizer(String organizerUserId);
    List<Event> getPendingEvents();
    Event approveEvent(String id);
    Event rejectEvent(String id);
}
