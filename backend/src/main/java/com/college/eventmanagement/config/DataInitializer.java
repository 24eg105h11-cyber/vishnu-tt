package com.college.eventmanagement.config;

import com.college.eventmanagement.model.Category;
import com.college.eventmanagement.model.Club;
import com.college.eventmanagement.model.Event;
import com.college.eventmanagement.model.User;
import com.college.eventmanagement.repository.CategoryRepository;
import com.college.eventmanagement.repository.ClubRepository;
import com.college.eventmanagement.repository.EventRepository;
import com.college.eventmanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClubRepository clubRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        seedCategories();
        seedUsers();
        seedClubsAndEvents();
    }

    private void seedCategories() {
        if (categoryRepository.count() == 0) {
            List<Category> categories = Arrays.asList(
                    Category.builder().name("Technical").slug("technical").description("Coding, AI, Hardware, Hackathons").icon("Cpu").build(),
                    Category.builder().name("Cultural").slug("cultural").description("Dance, Drama, Fashion, Celebrations").icon("Music").build(),
                    Category.builder().name("Sports").slug("sports").description("Tournaments, Fitness, Outdoor activities").icon("Trophy").build(),
                    Category.builder().name("Hackathon").slug("hackathon").description("Building 24/48h innovative projects").icon("Code").build(),
                    Category.builder().name("Workshop").slug("workshop").description("Hands-on learning and skill mastery").icon("BookOpen").build(),
                    Category.builder().name("Coding").slug("coding").description("Competitive programming & DSA contests").icon("Terminal").build(),
                    Category.builder().name("Entrepreneurship").slug("entrepreneurship").description("Startups, Pitching, Business Case Studies").icon("TrendingUp").build(),
                    Category.builder().name("Arts").slug("arts").description("Painting, Design, Photography").icon("Palette").build(),
                    Category.builder().name("Music").slug("music").description("Concerts, Bands, Jam sessions").icon("Radio").build()
            );
            categoryRepository.saveAll(categories);
        }
    }

    private void seedUsers() {
        if (!userRepository.existsByEmail("admin@college.edu")) {
            User admin = User.builder()
                    .name("Campus Administrator")
                    .email("admin@college.edu")
                    .password(passwordEncoder.encode("admin123"))
                    .collegeId("ADM-001")
                    .department("Administration")
                    .role("ROLE_ADMIN")
                    .points(1000)
                    .build();
            userRepository.save(admin);
        }

        if (!userRepository.existsByEmail("organizer@codingclub.edu")) {
            User organizer = User.builder()
                    .name("Alex Rivera (Coding Club Lead)")
                    .email("organizer@codingclub.edu")
                    .password(passwordEncoder.encode("org123"))
                    .collegeId("ORG-101")
                    .department("Computer Science")
                    .role("ROLE_ORGANIZER")
                    .points(500)
                    .build();
            userRepository.save(organizer);
        }

        if (!userRepository.existsByEmail("student@college.edu")) {
            User student = User.builder()
                    .name("Jane Smith")
                    .email("student@college.edu")
                    .password(passwordEncoder.encode("student123"))
                    .collegeId("STU-2024-889")
                    .department("Information Technology")
                    .year("3rd Year")
                    .phone("+1 555-0192")
                    .role("ROLE_STUDENT")
                    .points(420)
                    .build();
            userRepository.save(student);
        }
    }

    private void seedClubsAndEvents() {
        if (clubRepository.count() == 0) {
            User orgUser = userRepository.findByEmail("organizer@codingclub.edu").orElse(null);
            String orgId = orgUser != null ? orgUser.getId() : "org101";

            Club codingClub = Club.builder()
                    .name("ByteCraft Coding Club")
                    .code("BCC")
                    .description("Official Competitive Programming & Software Development Club of Campus.")
                    .category("Technical")
                    .logoUrl("https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80")
                    .bannerUrl("https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80")
                    .facultyCoordinator("Dr. Robert Vance")
                    .studentCoordinators(Arrays.asList("Alex Rivera", "Samantha Wu"))
                    .followersCount(480)
                    .status("APPROVED")
                    .organizerUserId(orgId)
                    .build();

            Club savedClub = clubRepository.save(codingClub);

            if (eventRepository.count() == 0) {
                Event hackathon = Event.builder()
                        .title("Campus HackOvernight 2026")
                        .clubId(savedClub.getId())
                        .clubName(savedClub.getName())
                        .clubLogoUrl(savedClub.getLogoUrl())
                        .category("Hackathon")
                        .description("24-Hour flagship campus hackathon building AI, Web3, and IoT prototypes. Total prize pool: $5,000!")
                        .posterUrl("https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80")
                        .date("2026-10-24")
                        .startTime("09:00")
                        .endTime("09:00 (Next Day)")
                        .venue("Main Auditorium & Innovation Lab")
                        .maxCapacity(200)
                        .registeredCount(142)
                        .status("APPROVED")
                        .rules(Arrays.asList("Teams of 2 to 4 members", "Original code written during hackathon", "Bring your college ID"))
                        .eligibility("Open to all students of 1st to 4th year")
                        .organizerUserId(orgId)
                        .contactEmail("hackathon@codingclub.edu")
                        .contactPhone("+1 555-8822")
                        .build();

                Event workshop = Event.builder()
                        .title("Hands-on FullStack Spring Boot & React Masterclass")
                        .clubId(savedClub.getId())
                        .clubName(savedClub.getName())
                        .clubLogoUrl(savedClub.getLogoUrl())
                        .category("Workshop")
                        .description("Learn how to build production-grade web applications with Spring Boot backend, MongoDB, and React frontend.")
                        .posterUrl("https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80")
                        .date("2026-10-18")
                        .startTime("14:00")
                        .endTime("17:00")
                        .venue("CS Seminar Hall 3B")
                        .maxCapacity(60)
                        .registeredCount(58)
                        .status("APPROVED")
                        .rules(Arrays.asList("Laptop required with Java 17 and Node installed"))
                        .eligibility("Intermediate programming knowledge recommended")
                        .organizerUserId(orgId)
                        .contactEmail("workshop@codingclub.edu")
                        .contactPhone("+1 555-9933")
                        .build();

                eventRepository.saveAll(Arrays.asList(hackathon, workshop));
            }
        }
    }
}
