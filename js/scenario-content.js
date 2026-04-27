/**
 * Scenario content – section buttons and content for solution-detail pages.
 * Positions are stored in localStorage per scenario (arrangement).
 */
const SCENARIO_CONTENT = {
    'hotels': {
        intro: "Even though hotels offer only temporary hospitality, they are committed to creating the most pleasant experience possible for every guest. Solution for Hotels integrates video security, alarm systems, attractive video displays, and a unified platform to enhance hotel management and security levels.",
        sections: [
            { title: "Parking Lot", challenges: "Hotel parking lots are often faced with inefficient operations during rush hours. Clients occasionally have difficulty finding available spaces.", challengeImg1: "Rush hour efficiency", challengeImg2: "Finding available spaces", whatWeOffer: "Non-stop entry and exit, flexible parking fee rules, retrievable vehicle records. Parking guidance cameras for efficient parking.", benefits: [{ title: "Entry & Exit", items: ["Boosted efficiency via statistics", "Simplified evidence collection", "Secure vehicle egress"] }, { title: "Parking guidance", items: ["Quickly locate parked vehicle", "Improved rush hour efficiency"] }], features: ["ANPR license plate fuzzy match", "Vehicle counting", "Self-service inquiry", "Multi-color light indications"] },
            { title: "Lobby", challenges: "Large amount of guests and activity 24/7. Constant security protection needed. Early alerts and timely response essential.", challengeImg1: "Wide space protection", challengeImg2: "Record retrieval", whatWeOffer: "Professional CCTV with wide area coverage. Commercial displays for welcoming and advertising.", benefits: [{ title: "Video security", items: ["Instant alerts with light and sound", "False alarm reduction", "Wide space coverage"] }, { title: "Advertising", items: ["Quick content release", "Professional content display"] }], features: ["Color imaging 24/7", "180° wide FOV", "Various media formats", "Flexible program schedules"] },
            { title: "Reception", challenges: "Timely service responses and customer experience. Prevent transaction errors and theft. Prevent long queues.", challengeImg1: "Delayed service", challengeImg2: "Long line waiting", whatWeOffer: "AI-empowered video security with queue management, wireless alarm sensors, and one-touch panic buttons.", benefits: [{ title: "Service efficiency", items: ["One-touch panic for emergencies", "Queue management for staff deployment"] }], features: ["One-touch panic alarm", "Wireless alarm sensors", "Multi-camera queue statistics", "HD video, AI queue detection"] },
            { title: "Indoor Public Spaces", challenges: "24/7 security for event halls, corridors, bars, restaurants, gyms, pools. Needs high clarity video, wide coverage, early alerts.", challengeImg1: "Diverse spaces", challengeImg2: "Emergency response", whatWeOffer: "Wide variety of video security for sharp, clear video 24/7. Easy-to-deploy wireless alarm for situational awareness.", benefits: [{ title: "Video security", items: ["Reduced installation costs", "Reliable 24/7 protection"] }], features: ["Corridor mode", "180° / 360° panoramic", "Excellent low-light", "Wireless bridge for elevators"] },
            { title: "Meeting Rooms", challenges: "Convenient display and content sharing. Loud, clear voice for collaboration. Quick implementation of remote conferencing.", challengeImg1: "Display and projection", challengeImg2: "Content sharing", whatWeOffer: "Interactive flat panels with HD camera and speakerphone for professional remote conferencing and local collaboration.", benefits: [{ title: "Conferencing", items: ["HD video, clear audio", "Works with Zoom, Webex"] }, { title: "Collaboration", items: ["Cable-free projection", "Remote control and batch install"] }], features: ["Built-in or USB camera", "Wireless projection", "Whiteboard", "Batch .apk installation"] },
            { title: "Inventory", challenges: "Inventory management has to prevent loss and damage from trespassers, internal theft, and hazards. Early notifications and evidence retrieval.", challengeImg1: "Inventory loss and damage", challengeImg2: "Delayed emergency response", whatWeOffer: "Touch-free, anti-spoofing and staff-only access with video verifications. Temperature anomaly alarms and wireless sensors.", benefits: [{ title: "Access and verification", items: ["Touch-free face recognition access", "Video verification for incident handling", "Early pre-warnings for fire and threats"] }], features: ["Video verifications for temperature, intrusion, access alarms", "Wireless alarm detectors", "Temperature anomaly alarm"] },
            { title: "Perimeter", challenges: "City hotels: large foot traffic. Suburbs: dim light at night. Need high clarity video and precise intrusion detection day and night.", challengeImg1: "Emergency response", challengeImg2: "Record retrieval", whatWeOffer: "Panoramic video, 24/7 color imaging. AI-empowered post-event search with filters to quickly locate targets.", benefits: [{ title: "Detection", items: ["Instant alert with light and sound", "False alarm reduction", "High clarity 24/7"] }], features: ["Built-in light and sound", "AI false alarm reduction", "Object attributes analysis", "Panoramic view"] },
            { title: "Control Room", challenges: "Complex combination of subsystems. Limited inter-application visibility. Difficult maintenance doubles workload.", challengeImg1: "Limited staff", challengeImg2: "Complex IT", whatWeOffer: "All-in-one platform for monitoring, incident handling, remote control, evidence and maintenance.", benefits: [{ title: "Unified management", items: ["Custom viewing panel per roles", "Cross-system interoperability"] }], features: ["System health dashboards", "Records retrieval and archiving", "Auto alarm popup", "4K video walls"] }
        ]
    },
    'factories': { intro: "The factory is a synthesis of personnel, assets, equipment, and machinery. Complicated challenges arise frequently. Synergates's Solution by Scenario for Factories provides cost-effective ways to guarantee efficient and safe production, and property protection.", sections: [
        { title: "Vehicle Entrance & Exit", challenges: "Manual identity check for drivers and vehicles can be inconvenient and time-consuming, as well as difficult to trace back when looking for specific vehicle records.", challengeImg1: "Rush hour congestion", challengeImg2: "Difficulty retrieving records", whatWeOffer: "Adding Efficiency and Security for Vehicle Management via hands-free, drive-through ANPR authentication and easy-to-retrieve records.", benefits: [{ title: "Secure and efficient vehicle egress", items: ["Support for block-list alarm / VIP notification", "Hands-free, non-stop, authenticated drive through"] }, { title: "Operational efficiency boost", items: ["Automated alarm push for block-list vehicle and full parking area", "Easy-to-retrieve records via fuzzy license plate match"] }], features: ["LED display of available spaces and parking info", "Vehicle records and parking statistics reports", "Support for granting access remotely via video intercom", "Authenticated vehicle access using ANPR or ID card"] },
        { title: "Lobby Entrance", challenges: "Factories are often highly regulated to ensure workplace and on-site personnel safety. Reception at the lobby entrance needs to efficiently handle visitor requests with secured access permissions, along with simple status update and retrieval capabilities.", challengeImg1: "Difficult to manage on-site visitor status", challengeImg2: "Difficult to trace back paper-based records", whatWeOffer: "Enhance workplace safety and operational efficiency with professional CCTV and digitized visitor management, with automated access permissions syncing to assigned doors, elevators, and entries and exits.", benefits: [{ title: "Paperless, digitalized visitor management", items: ["Privacy protection via auto delete of records", "Easy records search and report exporting", "Quickly view and check all visitor statuses"] }, { title: "Synchronized access permission", items: ["Support for manual or self-service check-out", "One-click permission to pre-assigned access level groups"] }], features: ["User-configurable visitor records can be set to auto delete", "Visitor record retrieval and report exporting", "Visitor registration, badge-printing, and check-in/-out"] },
        { title: "Workshop", challenges: "Ensuring production continuity for daily manufacturing tasks requires managing a large group of employees with multiple shifts, complex schedules, and high liquidity, as well as quick and effective emergency and incident response.", challengeImg1: "Threats to production continuity", challengeImg2: "Low efficiency during rush hours", whatWeOffer: "Enhanced Efficiency, Authenticity and Visibility for access and attendance management, with simple, highly-adaptive product solutions for a diverse deployment environment.", benefits: [{ title: "Boosted Efficiency, Added Reliability", items: ["Anti-spoofing with AI recognition technology", "Touch-free walk-in authentication, no physical ID required"] }, { title: "Adaptable to various authentication modes", items: ["Face, ID card and fingerprint in a single unit", "Perfect match for common-use cases"] }], features: ["Professional indoor HD CCTV", "Access and attendance using AI recognition, ID cards, fingerprints", "Video verification for access records", "Flexible configuration for shifts and schedule rules"] },
        { title: "Warehouse", challenges: "The primary roles for warehouse security personnel include preventing loss and damage caused by trespassers, internal theft, accidents, and other hazards. This protection requires early notifications, proper handling of incidents, and efficient evidence retrieval.", challengeImg1: "Theft and vandalism", challengeImg2: "Damage caused by hazards", whatWeOffer: "Easy-to-Deploy Intrusion Alarm, Temperature Anomaly Alarm, AI-Empowered Access Control, and 24/7 HD Video Coverage, all fused on one platform and providing multi-dimensional situational awareness.", benefits: [{ title: "Simple deployment, extensive features", items: ["Multi-lens cameras, mini PTZs, fisheye provide 24/7 wide area HD video", "Thermal imaging with temperature alarm and HD optical video in one camera"] }, { title: "Enhanced loss prevention with earlier detection", items: ["Instant alarm push with HD video to verify the situation", "Temperature detection discovering fire risks in early stages"] }], features: ["Temperature anomaly alarm", "Wide-area HD video 24/7", "Video verification for alarms", "Wireless alarm system, easy to install"] },
        { title: "Perimeter", challenges: "Factory perimeters usually see very limited nighttime lighting. Security teams need to quickly distinguish approaching humans or vehicles from harmless objects, and effectively stop trespassing as early as possible.", challengeImg1: "Dim light and false alarms", challengeImg2: "Quick intrusion response and deterrence", whatWeOffer: "Perimeter Protection with minimum false alarms via 24/7, all-weather, AI-empowered video protection, and maximum security efficiency with on-site deterrence and auto push alarms.", benefits: [{ title: "Clearer visual details and more precise alarms", items: ["Weather-adaptable thermographics", "24/7 colorful HD video captures every detail", "Reduced false alarms, higher security efficiency"] }, { title: "More effective incident handling", items: ["Instant on-site lighting and audio deterrence", "Earlier discovery and notification: auto push alarms"] }], features: ["On-site lighting and sound alarm", "AI false alarm filter for human & vehicle events only", "Clear, all-weather video 24/7"] },
        { title: "Control Room", challenges: "Control rooms usually combine multiple functions with various subsystems and equipment. Limited cross-application visibility and controls can easily double the workload for security staff and IT with difficult maintenance.", challengeImg1: "Limited staff, various subsystems", challengeImg2: "Complex IT maintenance", whatWeOffer: "All subsystems are unified on one platform for monitoring, incident handling, remote control, and maintenance, helping control room staff make management simpler and more effective.", benefits: [{ title: "Lightweight deployment, unified operation", items: ["All subsystems on one platform", "Minimal system requirements: i3 CPU, 8 GB RAM", "Custom layout of cameras, e-Maps, door status with 1-click access"] }, { title: "Gain system status quickly", items: ["Visualized diagram, reports and network topology", "Flexible edge storage, central storage options"] }], features: ["Centralized management of video, access control, vehicle, parking, alarm, attendance", "System and device health dashboard", "Support for edge storage, central storage and scheduled backup", "High clarity desktop displays and video walls"] }
    ]},
    'construction-site': { intro: "Construction sites face many complicated challenges. Our solution provides diverse, easy-to-deploy systems for effective safety and protection.", sections: [
        { title: "Vehicle entrance & exit", challenges: "Manual identity check inconvenient and difficult to trace.", challengeImg1: "Rush hour congestion", challengeImg2: "Difficulty retrieving records", whatWeOffer: "Fluid entry and exit with ANPR. Easy vehicle record retrieval.", benefits: [{ title: "Efficiency", items: ["Temporary vehicle management", "Video records"] }], features: ["Remote center calling", "Blocklist alarms", "Vehicle authentication"] },
        { title: "Main entrance", challenges: "Secure access for workers and visitors. Reliable attendance records.", challengeImg1: "Rush hours", challengeImg2: "Attendance disputes", whatWeOffer: "Access and attendance with authentication and visibility.", benefits: [{ title: "Access", items: ["Visual verification", "Various authentication modes"] }], features: ["Flexible shifts", "Anti-spoofing AI", "Video security"] },
        { title: "Construction areas", challenges: "Dim light at night. Clear monitoring and intrusion detection.", challengeImg1: "Dim lighting", challengeImg2: "Progress", whatWeOffer: "Time-lapse videos show construction progress.", benefits: [{ title: "Progress", items: ["Harsh environment design", "Clear progress display"] }], features: ["Weather-proof", "Time-lapse recording", "HD video"] },
        { title: "Key areas", challenges: "Risks like fire and theft. Quick response necessary.", challengeImg1: "Fire risks", challengeImg2: "Intrusion", whatWeOffer: "Wide area video, 24/7 color imaging, thermographic imaging.", benefits: [{ title: "Protection", items: ["Reliable in any light", "Early fire warnings"] }], features: ["Temperature anomaly", "AcuSense", "Thermographic camera"] },
        { title: "Tower cranes", challenges: "Wiring difficulties, vibration, dim lighting. Operational safety and HD evidence.", challengeImg1: "Harsh environments", challengeImg2: "Supervision", whatWeOffer: "Easy-to-deploy products for narrow spaces and harsh environments.", benefits: [{ title: "Safety", items: ["Production safety", "Stable video imaging"] }], features: ["Image stabilization", "Anti-vibration camera", "Wireless transmission"] },
        { title: "Management office", challenges: "Multiple subsystems. Limited visibility doubles workload.", challengeImg1: "Limited staff", challengeImg2: "Complex IT", whatWeOffer: "Unified management on one platform.", benefits: [{ title: "Efficiency", items: ["Custom UI", "Centralized management"] }], features: ["Health dashboard", "Edge/central storage", "Video walls"] }
    ]},
    'offices': { intro: "Office buildings require seamless security, access control, and operational efficiency. Our Solution by Scenario for Office Buildings integrates vehicle management, visitor handling, indoor security, meeting room technology, and a unified control platform.", sections: [
        { title: "Vehicle Entrance & Exit", challenges: "Manual identity check for drivers and vehicles can be inconvenient and difficult to trace back when retrieving specific vehicle records.", challengeImg1: "Rush hour congestion", challengeImg2: "Difficulty retrieving records", whatWeOffer: "Hands-free ANPR authentication and easy-to-retrieve vehicle records for secure, non-stop entry and exit.", benefits: [{ title: "Efficiency", items: ["Block-list alarm and VIP notification", "Non-stop drive-through authentication"] }, { title: "Records", items: ["Fuzzy license plate search", "Parking statistics and reports"] }], features: ["ANPR or ID card access", "Vehicle records", "Video intercom", "LED display for available spaces"] },
        { title: "Door Entrances", challenges: "Multiple building entrances need secure, traceable access without creating bottlenecks during peak hours.", challengeImg1: "Peak hour flow", challengeImg2: "Access traceability", whatWeOffer: "Multi-mode authentication and synchronized access permissions across doors and elevators.", benefits: [{ title: "Access control", items: ["Face, ID card, fingerprint in one unit", "Anti-spoofing AI"] }, { title: "Visibility", items: ["Video verification for access events", "Centralized door status"] }], features: ["Touch-free authentication", "Flexible shift rules", "HD CCTV at entrances", "Access records"] },
        { title: "Reception", challenges: "Reception must handle visitors efficiently with secured access permissions and easy status updates and record retrieval.", challengeImg1: "Visitor status", challengeImg2: "Record retrieval", whatWeOffer: "Digitized visitor management with automated access permissions syncing to assigned doors and elevators.", benefits: [{ title: "Visitor management", items: ["Easy records search and export", "One-click permission to access groups"] }, { title: "Privacy", items: ["Configurable auto-delete of visitor records", "Manual or self-service check-out"] }], features: ["Visitor registration", "Badge printing", "Check-in/out", "Pre-assigned access levels"] },
        { title: "Indoor Public Spaces", challenges: "Corridors, atriums, and common areas need 24/7 high-clarity video and wide coverage with early alerts.", challengeImg1: "Wide space coverage", challengeImg2: "Emergency response", whatWeOffer: "Professional CCTV with wide area coverage and reduced false alarms for indoor public spaces.", benefits: [{ title: "Video security", items: ["Instant alerts with light and sound", "Wide space coverage", "False alarm reduction"] }], features: ["Color imaging 24/7", "180° wide FOV", "Corridor mode", "Excellent low-light"] },
        { title: "Meeting Rooms", challenges: "Convenient display and content sharing, clear voice for collaboration, and quick remote conferencing.", challengeImg1: "Display and sharing", challengeImg2: "Remote conferencing", whatWeOffer: "Interactive flat panels with HD camera and speakerphone for professional conferencing and local collaboration.", benefits: [{ title: "Conferencing", items: ["HD video, clear audio", "Works with Zoom, Webex"] }, { title: "Collaboration", items: ["Cable-free projection", "Remote control and batch install"] }], features: ["Built-in or USB camera", "Wireless projection", "Whiteboard", "Batch .apk installation"] },
        { title: "Inventory", challenges: "Preventing loss and damage from trespassers, internal theft, and hazards; early notifications and evidence retrieval.", challengeImg1: "Inventory loss", challengeImg2: "Delayed response", whatWeOffer: "Touch-free access with video verification, temperature anomaly alarms, and wireless sensors.", benefits: [{ title: "Access and verification", items: ["Touch-free face recognition", "Video verification for incidents", "Early pre-warnings for fire and threats"] }], features: ["Video verification for temperature, intrusion, access", "Wireless alarm detectors", "Temperature anomaly alarm"] },
        { title: "Perimeter", challenges: "Building perimeters need high-clarity video and precise intrusion detection day and night.", challengeImg1: "Night visibility", challengeImg2: "Intrusion detection", whatWeOffer: "24/7 color imaging and AI-empowered post-event search to quickly locate targets.", benefits: [{ title: "Detection", items: ["Instant alert with light and sound", "False alarm reduction", "High clarity 24/7"] }], features: ["Built-in light and sound", "AI false alarm reduction", "Object attributes analysis", "Panoramic view"] },
        { title: "Control Room", challenges: "Multiple subsystems with limited cross-application visibility and difficult maintenance.", challengeImg1: "Limited staff", challengeImg2: "Complex IT", whatWeOffer: "All subsystems unified on one platform for monitoring, incident handling, and maintenance.", benefits: [{ title: "Unified management", items: ["Custom viewing panel per role", "All subsystems on one platform"] }, { title: "Status", items: ["System health dashboard", "Visualized reports and topology"] }], features: ["Centralized video, access, vehicle, alarm, attendance", "Health dashboard", "Edge/central storage", "4K video walls"] }
    ]},
    'gas-stations': { intro: "Gas stations require round-the-clock security across fueling zones, store, and back-office areas. Our solution covers vehicle flow, fueling safety, unloading, store entrances, shopping areas, checkout, and staff offices.", sections: [
        { title: "Vehicle Entrance & Exit", challenges: "Managing vehicle flow and preventing unauthorized access while keeping traffic moving.", challengeImg1: "Vehicle flow", challengeImg2: "Access control", whatWeOffer: "ANPR and access control for hands-free vehicle authentication and retrievable records.", benefits: [{ title: "Efficiency", items: ["Non-stop drive-through where applicable", "Block-list alarm"] }, { title: "Records", items: ["Fuzzy license plate search", "Vehicle and time records"] }], features: ["ANPR or barrier control", "Vehicle records", "LED display", "Video intercom"] },
        { title: "Fueling Zones", challenges: "Monitoring fueling activity for safety, theft prevention, and clear evidence in case of incidents.", challengeImg1: "Fueling safety", challengeImg2: "Incident evidence", whatWeOffer: "HD video coverage of pumps and forecourt with 24/7 color imaging and optional analytics.", benefits: [{ title: "Safety", items: ["Clear forecourt video", "Instant alert on anomalies"] }, { title: "Evidence", items: ["Easy retrieval by time and area", "Wide coverage with fewer cameras"] }], features: ["Wide FOV and low-light imaging", "Vandal-resistant design", "Audio for deterrence", "Integration with fuel management"] },
        { title: "Unloading Zone", challenges: "Securing delivery and unloading areas against theft and unauthorized access.", challengeImg1: "Delivery security", challengeImg2: "Unloading records", whatWeOffer: "Controlled access and full video coverage of unloading zones with event-based recording.", benefits: [{ title: "Security", items: ["Access control for delivery personnel", "Video verification of deliveries"] }, { title: "Audit", items: ["Time-stamped records", "Integration with inventory"] }], features: ["Access control", "HD CCTV", "Motion and intrusion detection", "Night visibility"] },
        { title: "Store Entrances", challenges: "Balancing open access for customers with theft prevention and clear entry/exit visibility.", challengeImg1: "Customer flow", challengeImg2: "Theft prevention", whatWeOffer: "Video analytics at entrances with optional people counting and loitering detection.", benefits: [{ title: "Visibility", items: ["Clear entrance/exit video", "Peak hour monitoring"] }, { title: "Prevention", items: ["Deterrence with visible cameras", "Quick evidence retrieval"] }], features: ["HD entrance cameras", "People counting option", "Low-light imaging", "Wide FOV"] },
        { title: "Shopping Areas", challenges: "In-store security without obstructing shopping experience; deterrence and evidence.", challengeImg1: "In-store security", challengeImg2: "Evidence retrieval", whatWeOffer: "Discrete but effective in-store coverage with analytics for hot zones and dwell time.", benefits: [{ title: "Deterrence", items: ["Visible coverage in key aisles", "Audio warning option"] }, { title: "Insights", items: ["Heat maps and dwell analytics", "Integration with POS where needed"] }], features: ["Indoor HD cameras", "Fisheye and dome options", "Analytics", "Remote viewing"] },
        { title: "Checkout Counter", challenges: "Preventing till theft and disputes; clear view of transactions and queue management.", challengeImg1: "Till security", challengeImg2: "Queue management", whatWeOffer: "Focused coverage of checkout with optional queue length and panic alarm integration.", benefits: [{ title: "Transaction security", items: ["Clear view of cash and card", "One-touch panic for emergencies"] }, { title: "Operations", items: ["Queue statistics for staff deployment", "Evidence for disputes"] }], features: ["HD counter coverage", "Panic button integration", "Queue analytics", "POS overlay option"] },
        { title: "Staff Office", challenges: "Securing back-office and cash handling with access control and audit trail.", challengeImg1: "Back-office security", challengeImg2: "Cash handling", whatWeOffer: "Access control and video for staff-only areas with synchronized permissions and records.", benefits: [{ title: "Access", items: ["Restricted access by role", "Visitor escort rules"] }, { title: "Audit", items: ["Access and video records", "Integration with alarm"] }], features: ["Access control", "HD CCTV", "Video verification", "Alarm integration"] }
    ]},
    'schools': { intro: "Schools and campuses need safe vehicle and pedestrian flow, secure perimeters, and visibility in public areas and classrooms. Our solution covers entrances, gates, dormitories, public areas, perimeter, classrooms, and control room.", sections: [
        { title: "Vehicle Entrance & Exit", challenges: "Managing parent and staff vehicles while keeping student areas safe and records traceable.", challengeImg1: "Vehicle flow", challengeImg2: "Record retrieval", whatWeOffer: "ANPR and access control for authorized vehicles with clear records and optional visitor pre-registration.", benefits: [{ title: "Safety", items: ["Block-list and allow-list support", "Non-stop flow for authorized vehicles"] }, { title: "Records", items: ["Fuzzy plate search", "Time and visitor logs"] }], features: ["ANPR", "Barrier control", "Vehicle records", "Video intercom"] },
        { title: "School Gates & Dormitories", challenges: "Controlling who enters the campus and dormitory areas with reliable authentication and visitor management.", challengeImg1: "Gate access", challengeImg2: "Dormitory security", whatWeOffer: "Access control at gates and dorm entrances with face, card, or fingerprint and visitor badging.", benefits: [{ title: "Access", items: ["Multi-mode authentication", "Anti-spoofing"] }, { title: "Visitors", items: ["Pre-registration and badge", "Escort and time limits"] }], features: ["Gates and turnstiles", "Visitor management", "HD CCTV", "Access records"] },
        { title: "Public Area", challenges: "Corridors, cafeterias, and outdoor common areas need 24/7 visibility and quick response to incidents.", challengeImg1: "Common areas", challengeImg2: "Incident response", whatWeOffer: "Wide-area and corridor video with instant alerts and reduced false alarms.", benefits: [{ title: "Visibility", items: ["Wide FOV and 24/7 color", "Corridor and outdoor coverage"] }, { title: "Response", items: ["Instant light and sound alert", "Easy evidence retrieval"] }], features: ["180° / 360° options", "Low-light imaging", "Audio deterrence", "Event search"] },
        { title: "Perimeter", challenges: "Campus perimeter protection with minimal false alarms and clear night-time visibility.", challengeImg1: "Perimeter intrusion", challengeImg2: "Night visibility", whatWeOffer: "24/7 AI-empowered perimeter video with on-site deterrence and auto push alarms.", benefits: [{ title: "Detection", items: ["Human and vehicle filter", "Reduced false alarms"] }, { title: "Deterrence", items: ["On-site light and sound", "Early notification"] }], features: ["Thermal and optical options", "AI false alarm filter", "Light and sound alarm", "All-weather"] },
        { title: "Classroom", challenges: "Supporting safety and situational awareness in classrooms without disrupting teaching.", challengeImg1: "Classroom safety", challengeImg2: "Situational awareness", whatWeOffer: "Discrete classroom coverage with privacy options and integration with emergency protocols.", benefits: [{ title: "Safety", items: ["Clear video for emergencies", "Privacy-compliant deployment"] }, { title: "Operations", items: ["Remote viewing for admin", "Evidence for incidents"] }], features: ["Indoor HD cameras", "Privacy masking", "Emergency integration", "Audio option"] },
        { title: "Control Room", challenges: "Unifying video, access, alarm, and emergency systems for limited staff.", challengeImg1: "Multiple systems", challengeImg2: "Staff efficiency", whatWeOffer: "One platform for all security subsystems with custom layouts and health monitoring.", benefits: [{ title: "Unified operation", items: ["One platform", "Custom layout"] }, { title: "Reliability", items: ["Health dashboard", "Storage and backup options"] }], features: ["Centralized management", "Health dashboard", "Video walls", "Alarm and access integration"] }
    ]},
    'warehouses': { intro: "Warehouses need end-to-end visibility: general security, dock management, parcel tracking, and traffic flow. Our solution integrates video, access control, and analytics on one platform.", sections: [
        { title: "General Security", challenges: "Preventing loss from trespassers, internal theft, and hazards; early notifications and evidence retrieval.", challengeImg1: "Theft and intrusion", challengeImg2: "Hazards", whatWeOffer: "24/7 HD video, intrusion and temperature alarms, and AI-empowered access control on one platform.", benefits: [{ title: "Awareness", items: ["Multi-dimensional situational awareness", "Temperature and intrusion alarms"] }, { title: "Evidence", items: ["Instant alarm push with HD video", "Easy retrieval by time and zone"] }], features: ["Wide-area HD video", "Temperature anomaly alarm", "Wireless alarm", "Video verification"] },
        { title: "Dock Management", challenges: "Managing loading docks for safety, slot utilization, and clear records of arrivals and departures.", challengeImg1: "Dock safety", challengeImg2: "Slot utilization", whatWeOffer: "Dock-focused video and access control with optional slot booking and vehicle identification.", benefits: [{ title: "Safety", items: ["Clear view of dock activity", "Alerts for unauthorized access"] }, { title: "Efficiency", items: ["Dock status at a glance", "Records for scheduling"] }], features: ["Dock cameras", "Access control at docks", "ANPR option", "Integration with WMS"] },
        { title: "Parcel Tracking", challenges: "Tracking parcels and packages through receiving, staging, and dispatch with audit trail.", challengeImg1: "Parcel flow", challengeImg2: "Audit trail", whatWeOffer: "Video and optional barcode/scan integration for parcel movement and proof of handover.", benefits: [{ title: "Traceability", items: ["Time-stamped video at key points", "Proof of receipt and dispatch"] }, { title: "Disputes", items: ["Quick evidence retrieval", "Reduced loss and disputes"] }], features: ["HD at receiving and dispatch", "Integration with scanning", "Event-based recording", "Search by time and zone"] },
        { title: "Traffic Management", challenges: "Managing internal traffic of forklifts and vehicles to avoid congestion and accidents.", challengeImg1: "Internal traffic", challengeImg2: "Congestion and safety", whatWeOffer: "Video analytics for traffic flow, speed and zone rules, and integration with access and alarm.", benefits: [{ title: "Safety", items: ["Zone and speed analytics", "Incident and near-miss evidence"] }, { title: "Flow", items: ["Congestion and hotspot visibility", "Better layout and routing"] }], features: ["Traffic and zone analytics", "Forklift and vehicle detection", "HD coverage of aisles and crossings", "Unified platform"] }
    ]}
};

const PLACEHOLDER_INTRO = "Comprehensive security and technology solution for this scenario.";
const PLACEHOLDER_SECTION = { title: "Overview", challenges: "Organizations face various operational and security challenges.", challengeImg1: "Operational challenges", challengeImg2: "Security requirements", whatWeOffer: "We offer integrated video, access, and analytics solutions tailored to your environment. Our systems support 24/7 monitoring, real-time alarms, and clear evidence for audits and incident response. Deploy on a single platform with flexible hardware and software options to meet your security and operational needs.", benefits: [{ title: "Benefits", items: ["Improved efficiency", "Enhanced security", "Unified management", "Reliable evidence"] }, { title: "Key features", items: ["HD video surveillance", "Access control", "Unified platform", "24/7 support"] }], features: ["HD video surveillance", "Access control", "Unified platform", "24/7 support"] };
const SECTION_COUNTS = { 'classroom-hub': 4, 'urban-roadways': 7, 'offices': 8, 'stores': 6, 'bus-stop': 5, 'car-dealerships': 6, 'conference-rooms': 2, 'electrical-substations': 3, 'gas-stations': 7, 'highways': 6, 'monitoring-center': 3, 'parking-lots': 4, 'schools': 6, 'shopping-malls': 4, 'transit-bus-onboard': 4, 'warehouses': 4, 'onshore-oilfields': 5, 'supermarkets': 6, 'offshore-oil-platform': 3, 'transmission-line-inspection': 4, 'pipeline-inspection': 4, 'solar-farms': 4, 'hydroelectric-power-plants': 5 };

/** Solution overview (intro) for each scenario – shown under "Solution overview" on every solution page. */
const SOLUTION_OVERVIEWS = {
    'classroom-hub': "The movement toward informatization in education is continually being pursued. Students growing up in a technological world expect more immersive learning and better resources. Our Classroom Hub solution extends real classrooms to digital and virtual ones, bridging gaps between teaching and learning with digital teaching tools, remote learning, and multi-classroom instruction so all staff can enjoy more connectivity, engagement, and learning breakthroughs.",
    'urban-roadways': "Urban communities rely on roadways to move people and vehicles across the city. With high travel frequency, urban roadways often face congestion, violations such as red-light running, speeding, and illegal parking, while monitoring remains limited and data fragmented. Our Urban Roadways solution provides multi-scene monitoring, unlawful driving supervision, and intelligent software to reduce violations, protect citizens, and keep city roads safe.",
    'stores': "Stores face daily challenges from loss prevention and operational efficiency to customer experience. Our solution for stores combines reliable video security for daily management with analytics to support in-store layout and customer flow, helping you boost operational efficiency and revenue while securing entrances, parking, shopping areas, cashiers, inventory, and back-office.",
    'bus-stop': "Growth in cities and extension of roadways demand more and better public transit. For bus lines this means more stops, upgraded buses, and a safer experience for passengers. Our Bus Stop solution uses AI-powered analytics, video security, on-site voice broadcast, and centralized management to enhance security and efficiency at bus stops and transit systems, ensuring a safer and more comfortable experience for everyone.",
    'car-dealerships': "Car dealerships bring together sales, service, spare parts, and surveys in one place. With many valuable cars on display, security is complex and critical. Our solution for car dealerships integrates video security, commercial displays, alarm systems, and a unified platform to keep facilities safe and efficient while delivering a pleasant experience for customers from parking and entrance through showroom, office, and control room.",
    'conference-rooms': "Audio and video conferencing has become essential, yet conventional systems are often complex, inflexible, and expensive. Our Conference Rooms solution supports small, medium, and large conferencing in a cost-effective way. Easy-to-deploy displays, HD cameras, and clear audio help teams connect, communicate, and collaborate with minimal setup and maximum flexibility.",
    'electrical-substations': "Substations – the midpoint of today's power transmission systems – play a key role in keeping electrical energy safe and reliable. As your steady partner of choice, Synergates provides reliable security protections while enabling efficient operations and timely maintenance for substations.",
    'highways': "Highways carry huge numbers of vehicles every day, and safety and supervision must keep pace. Congestion, speeding, gore-area violations, and emergency-lane occupancy are common. Our Highway solution covers toll stations, traffic lanes, ramps, shoulders, tunnels, and command centers with integrated monitoring, violation detection, and incident response to keep traffic flowing and people traveling safely.",
    'monitoring-center': "Monitoring centers of any size need an effective, intuitive, and high-performance display and control solution. Synergates's Solutions for Monitoring Centers provide professional display and control solutions for multi-subsystem projects at any scale to meet a multitude of application needs and make best use of existing security management systems.",
    'parking-lots': "Parking lot operators aim to make the most economical use of space while drivers struggle to find a free spot quickly. Our Parking Lot solution guides drivers to available spaces, streamlines entry and exit, and supports flexible fee rules and retrievable vehicle records. It helps optimize operations and add extra layers of security with entrance and exit management, indoor guidance, and operation and management tools.",
    'shopping-malls': "Shrinkage and tight budgets challenge shopping malls while customers expect more. Our solution for shopping malls helps attract and satisfy a larger audience with better security, customer traffic analytics, commercial display advertising, and smart parking management—creating a safer, more engaging environment and a stronger first impression.",
    'transit-bus-onboard': "City buses face safety concerns, rider experience issues, and operational obstacles. Our Transit Bus On-board solution helps operators run a comprehensive management system: abnormal detection, emergency alarms, video security, intelligent driving assistance, and central management for passenger areas, driving cabin, entryway, and operation center—guaranteeing efficiency, safety, and security across the transit bus system.",
    'onshore-oilfields': "Onshore oilfields are the primary source of crude oil production and a vital component of the global energy mix. Synergates's cutting-edge digital oilfield solution utilizes smart technologies and products to improve physical security, assist production, and ensure the safety of personnel across checkpoints, well pads and pipelines, processing plants, vehicles, and office areas.",
    'supermarkets': "Supermarkets face challenges from dead spaces and loss prevention to operational optimization. Our solution offers reliable video security for daily management combined with analytics for in-store layout and customer flow. From entrance and parking to shopping area, cashiers, inventory, and IT room, we help boost operational efficiency and revenue while strengthening security.",
    'offshore-oil-platform': "Offshore oil platforms operate in harsh, remote conditions where security and equipment monitoring are critical. Our solution covers platform perimeter, critical equipment areas, and control room with robust video, access control, and unified management to protect personnel and assets and support safe, efficient operations.",
    'transmission-line-inspection': "Electricity generated at power plants must travel long distances and undergo voltage conversion before reaching consumers. Transmission lines are critical components in this process, requiring continuous monitoring to prevent failures and ensure smooth operation. Synergates's advanced solution uses smart technologies to enhance security, streamline maintenance, and ensure cost-effective, safe operations.",
    'pipeline-inspection': "Pipeline networks need continuous monitoring along the route, at valve stations, and at crossings. Our solution provides video and analytics for pipeline route surveillance, valve station security, crossing protection, and a central control center to detect leaks, intrusions, and operational issues in real time.",
    'solar-farms': "Solar farms, typically located in remote mountainous areas or deserts, present challenges for overall security management. Synergates's Solar Farm Solution leverages smart technologies to simplify operations, enhance security, and create a safer working environment for workers.",
    'hydroelectric-power-plants': "Hydroelectric plants integrate dam, reservoir, turbine hall, switchyard, and perimeter into one critical infrastructure. Our solution provides comprehensive video security, access control, and monitoring across these areas with a unified control center for safety, asset protection, and operational visibility."
};

/** Challenges text per section for each solution (when no full SCENARIO_CONTENT). One string per section. */
const SECTION_CHALLENGES = {
    'classroom-hub': [
        "In conventional classrooms, teaching tools offer limited formats for writing and illustration, and students in the back row or with learning difficulties struggle. Teachers need many separate tools—chalk, markers, projector, whiteboard, pointer—so teaching and efficiency rarely go together.",
        "Conventional PCs or cameras provide only a fixed angle, so students cannot engage in an immersive remote experience. Camera setup is time-consuming and complicated, and limited by the technologies available in each classroom.",
        "Traditional approaches offer simple, one-way content sharing without real engagement. Teachers find it hard to gauge how students react, and excellent educational resources are scarce and difficult to share beyond a single classroom.",
        "Schools deploy large numbers of interactive displays. Managing devices one by one is time-consuming, error-prone, and makes it hard to configure and maintain everything efficiently from a central point."
    ],
    'urban-roadways': [
        "Intersections are where vehicles and pedestrians converge; traffic is very busy and accidents are common due to violations. Lack of violation evidence makes response difficult and risks unavoidable.",
        "Speeding and reckless driving on urban roads cause serious damage. Lack of violation detection and response is a primary concern, and authorities often lack ways to predict traffic flow, so lanes are congested especially on holidays.",
        "Bus priority helps ease urban congestion, but private vehicles often occupy or park in bus lanes. Without violation evidence, enforcement is difficult and congestion continues.",
        "Urban roadside space is limited. Many cities allow short-stay parking on parts of the roadside, but vehicles park too long. Limited police and lack of violation evidence make enforcement difficult.",
        "Yellow box junctions at intersections and near schools, hospitals, and government buildings must stay clear. Vehicles are not allowed to wait in them, but without evidence enforcement is difficult and congestion persists.",
        "Gore areas at wide or complex intersections guide drivers to the correct routes. Vehicles crossing them increase accidents and congestion. Police cannot be at every gore every day, so evidence is lacking.",
        "Command centers need to manage violations and emergencies daily. Third-party systems often lack a standard platform to manage large numbers of devices and complex processes; data volume and manual operations are costly and inefficient."
    ],
    'stores': [
        "Store entrances are critical for security and marketing. Operations rely on precise customer-visit data, while staff must stay alert to approaching risks such as known shoplifters.",
        "Customers may have a hard time finding a parking space quickly. When many customers arrive, parking lots are prone to congestion and a poor first impression.",
        "The shopping area has high daily foot traffic. It must attract attention and lead customers to engage, while security must protect staff, customers, and assets effectively.",
        "At the cashier, customer experience and loss prevention both matter. Long queues and disputes hurt service; transaction errors, fraud, and theft require investigation and prevention.",
        "Inventory teams need early awareness and effective incident response. Loss and damage from trespassers, internal theft, and hazards must be prevented with timely alerts and evidence.",
        "Control rooms combine multiple subsystems and equipment. Inconvenient data search and limited cross-application visibility can double the workload for staff."
    ],
    'bus-stop': [
        "Bus stops are prone to risks due to their locations. Generic monitoring often cannot detect anomalies in time to prevent accidents and ensure public safety, leading to a poor waiting and riding experience.",
        "Bus stop status is crucial when optimizing departure intervals and planning routes. Incomplete information reduces operational efficiency and causes unnecessary wait times for passengers.",
        "With many bus stops and limited patrols, video monitoring with conventional alarms cannot handle events in a timely way. Collisions and other incidents are often missed.",
        "Illegal parking at bus stops affects inbound and outbound buses, slows boarding and alighting, and reduces efficiency. Disputes without evidence also hinder enforcement when footage is missing or unclear.",
        "Bus stops are spread across urban areas, and operators lack versatile, easy-to-use central software to monitor and manage all stops efficiently. Traditional platforms offer too few functions."
    ],
    'car-dealerships': [
        "When many customers visit and cars awaiting repair back up, parking becomes especially challenging. Keeping cars safe during rush hours, congestion, and limited space is crucial; a good parking experience is the first step to a good impression.",
        "Dealership perimeters need reliable video and easy-to-retrieve records to protect valuable cars and assets. With dim lighting at night and few staff on duty, precise intrusion detection and quick response are critical.",
        "The main entrance is critical for security and marketing. Staff must stay alert to unknown trespassers while providing timely service to guests; the entrance is also a key marketing location to optimize profitability.",
        "Showrooms and maintenance areas are where customers, cars, salespeople, and technicians meet. These areas need 24/7 protection and timely response to intrusion and risks such as fire, water leakage, and broken glass, with easy-to-retrieve records.",
        "Dealership offices require secure, smooth access for authorized staff and clients, plus easy-to-use tools for attendance. Rush-hour identity checks reduce efficiency, and disputes over attendance records are common.",
        "Control rooms combine various subsystems and equipment. Limited visibility across applications and difficult maintenance double the daily workload for security and IT."
    ],
    'conference-rooms': [
        "Small and medium-sized conferences need plug-and-play convenience and portability. Conventional conference devices require time-consuming configuration, making it difficult for users to communicate effectively.",
        "In medium and large conferences, multi-speaker setups, long-distance voice pickup, and effective sound amplification are hindered by a more complex environment. Everyone's voice and ideas need to be clearly and fully heard."
    ],
    'electrical-substations': [
        "Electrical substations have complex operational processes, and harsh environments can make on-site operations and supervision difficult. Lack of qualified inspection personnel and critical operations that require round-the-clock monitoring pose significant challenges.",
        "Ensuring personnel safety along with the reliable supply of electricity is increasingly challenging due to threats targeting power infrastructures and remote substation sites. Remotely located substations are vulnerable to intrusions, and safety hazards in the workplace require constant attention.",
        "Centralized monitoring and control is crucial for substations. Without it, processes such as monitoring, maintenance, and repairs must be done manually, which can be time-consuming and prone to errors. Lack of unified management platforms and limited visibility into multiple substations hinder efficiency."
    ],
    'highways': [
        "Large numbers of vehicles enter and exit highways every day, requiring stricter supervision and faster processing. Conventional toll solutions are often lax and inefficient.",
        "Speeding and reckless driving on highways cause serious damage. Lack of violation detection and slow response are a concern; authorities also lack ways to predict flow, and highways are often congested on holidays.",
        "Violations such as weaving and parking in gore areas happen more near on- and off-ramps, increasing accidents and congestion. Management cannot station officers at every ramp every day, so evidence is lacking.",
        "Where driving on highway shoulders is prohibited, it still happens during congestion or after accidents. It blocks police and rescue vehicles and can lead to more congestion, injuries, and losses.",
        "Tunnels face challenging traffic and light conditions and higher accident rates. Traditional monitoring cannot detect incidents and anomalies in time to minimize dangers such as accidents or unexpected roadblocks.",
        "Highway command centers are essential for daily routines like ticketing and emergency handling. Third-party systems often lack a standard platform to manage many devices and complex processes; data volume and manual operations are costly."
    ],
    'monitoring-center': [
        "Small IT rooms quickly reach their limits on space, staff, and budget, which makes it important to provide efficient display solutions for security management. Solutions must provide intuitive operation, informative displays on a limited number of screens, and simple product combinations.",
        "Security control rooms often combine multiple functions with various subsystems and equipment. They are required to provide efficient investigation and evidence collection across multiple subsystems. Limited cross-application visibility and controls will double the workload for security staff.",
        "Professional monitoring centers require a large number of on-screen displays, diverse input sources from various subsystems with different signal formats and connector types, as well as operations teams with different roles, daily tasks, and shifts. It is essential to build a reliable large-scale video wall of high performance with flexible, effective content management."
    ],
    'parking-lots': [
        "Entrances and exits are a top concern, especially with time and labor costs. Intelligent vehicle authentication is needed for security and smooth passage—block-list alarm, ANPR, and the like—plus quick record retrieval for evidence and disputes.",
        "Drivers often cannot find a free space or remember where they parked in large lots. Difficult navigation and long search times frustrate customers and reduce efficiency.",
        "Rush hours create serious efficiency challenges. Wrongful charges and fraud attempts slow operations and cause loss, often due to lack of systematic parking management.",
        "Many lots lack effective management of space occupation, detailed records, and utilization data. Weak statistics and lack of video evidence for disputes limit efficiency and security."
    ],
    'shopping-malls': [
        "Attracting and retaining customer traffic is key. Mall managers need ways to evaluate tenant mix, assess marketing activities, and optimize layout and services.",
        "In customer-driven malls, catching and keeping attention matters. Lack of attractiveness and poor navigation guidance can reduce footfall and engagement.",
        "Safety comes first for customers, staff, and assets. Accidents can lead to significant losses; blind spots and untimely response to emergencies are major concerns.",
        "Parking is often the first impression. Inconvenient parking leads to unhappy customers, traffic issues, and revenue loss; entry congestion and difficulty finding a space are common complaints."
    ],
    'transit-bus-onboard': [
        "Low-definition video with dead angles may miss risks in the cabin and seating areas, increasing danger. Operators also lack effective ways to handle on-board issues quickly.",
        "Bus safety is hampered by unexpected anomalies, blind spots, and complex urban roads. Drivers need better assistance and alerts to maintain awareness and prevent accidents.",
        "Passengers get on and off at the entryway. Manual and inaccurate statistics slow optimization and can create traffic jams and inefficient operations.",
        "Numerous, scattered bus routes in cities often lead to unreasonable schedules or routes, increasing operating pressure and reducing efficiency for passengers. Device management and route planning need to be centralized and flexible."
    ],
    'onshore-oilfields': [
        "The checkpoint is the first barrier before entering the oilfield. Demand for quick threat response and inefficient access control management present challenges. Monitoring passing vehicles and personnel, identifying potential threats, and enabling quick responses are essential for enhancing fleet efficiency.",
        "Intrusions targeting the well pads, pipelines, and other remote sites have become an ever-present threat. Reduced false alarms and 24/7 video monitoring are needed to protect vulnerable and valuable infrastructure, with detection that filters out animals and environmental clutter.",
        "Efficient and safe operations are essential at processing plants. Limited visibility into multiple processing plants and lack of unified management platforms pose challenges. Process monitoring, thermography, gas leakage detection, and personnel safety compliance require integrated solutions.",
        "The lack of accurate driver status monitoring poses a significant risk to both the driver and others. With constant traffic flow in busy oilfield sites, the ability to track and coordinate vehicles becomes crucial to prevent accidents and ensure smooth operations.",
        "Effective personnel management is vital due to the large workforce and varying shifts. Emergency mustering becomes difficult in emergencies, as accurately locating and gathering employees in a safe place amid chaotic conditions and diverse office layouts poses a significant hurdle."
    ],
    'supermarkets': [
        "Supermarket entrances need precise customer-traffic data for marketing and operations, while staff must stay alert to approaching risks such as known shoplifters.",
        "Customers often struggle to find a space quickly; at peak times parking lots are prone to congestion and a poor first impression.",
        "The shopping area has high daily traffic. It must attract and guide customers while security protects staff, customers, and assets effectively.",
        "At the cashier, customer experience and loss prevention both matter. Long queues and disputes hurt service; transaction errors, fraud, and theft require investigation and prevention.",
        "Inventory teams need early awareness and incident response. Loss and damage from trespassers, internal theft, and hazards must be prevented with timely alerts and evidence.",
        "Control rooms combine multiple subsystems. Inconvenient data search and limited cross-application visibility double the workload for staff."
    ],
    'offshore-oil-platform': [
        "Platforms operate in remote, harsh conditions. The perimeter must deter and detect intrusion, unauthorized vessels, and safety threats with reliable 24/7 monitoring.",
        "Critical equipment—drilling, processing, and safety systems—must be protected from tampering, failure, and environmental hazards. Early detection and clear evidence are essential.",
        "The control room must unify video, access, process, and safety systems. Limited visibility and difficult maintenance increase risk and operational cost."
    ],
    'transmission-line-inspection': [
        "Maintaining transmission lines in hazardous and remote environments poses significant challenges. Complex operations in harsh environments lead to infrequent inspections and delayed maintenance. Inspection inefficiency increases risk and cost.",
        "Field inspections can be dangerous, making efficient and safe inspection of electrical devices important. Safety hazards at heights and difficulty in timely fault detection require remote image inspection and thermal temperature inspection capabilities.",
        "Maintaining power facilities in remote or high locations may sometimes pose safety risks for personnel. Lack of on-site operation records and difficulty ensuring standardized operations require real-time recording and streamlined operation supervision.",
        "Fragmented management systems hinder efficiency and timely responses to issues. Lack of unified management platforms and difficulty ensuring standardized operations require a comprehensive platform for data visualization and analysis, with visualized dashboards and multi-dimensional reports."
    ],
    'pipeline-inspection': [
        "Pipeline routes cover long distances and are vulnerable to third-party damage, leaks, and intrusion. Monitoring the full route for anomalies and threats is difficult with limited resources.",
        "Valve stations and pumping stations are critical points. Unauthorized access, equipment failure, and leaks must be detected and reported quickly with clear evidence.",
        "Road, river, and other crossings are high-risk locations. Damage or intrusion at crossings can cause spills and safety incidents; monitoring and response must be reliable.",
        "A central control room must oversee the entire pipeline system. Data from route, valves, and crossings need to be unified for efficient incident response and maintenance."
    ],
    'solar-farms': [
        "In solar farms where there is limited supervision, perimeter protection and vehicle management need to be much easier. Thermal and AI-based technologies help secure the perimeter and provide efficient entrance and exit control for vehicles, with identification even in low-light conditions.",
        "Solar farm solution boosts health and safety for personnel with continuous monitoring of critical areas using AI-powered analytics. Access control management and personnel safety compliance – including verification of personal protective equipment – help identify, manage, and prevent potential risks.",
        "By remote monitoring with early detection of equipment issues, the solution streamlines and digitizes the inspection process, minimizing operational downtime and maximizing efficiency. Standardized inspection process and diversified product mix options for remote and on-site inspections are essential.",
        "Synergates Central platform and video wall system offer centralized management solution for solar farms. With visualized data collection and analysis, operators gain insights into operational performance and address security risks quickly through a centralized dashboard."
    ],
    'hydroelectric-power-plants': [
        "The dam and reservoir are critical for safety and operations. Water level, seepage, unauthorized access, and perimeter intrusion must be monitored 24/7 with reliable evidence.",
        "The turbine hall contains critical machinery and high-risk areas. Safety, theft, and equipment condition require continuous video and access control with minimal downtime.",
        "The switchyard handles high-voltage equipment and grid connection. Unauthorized access, faults, and environmental hazards need early detection and clear evidence for response.",
        "Plant perimeter must protect against intrusion and unauthorized access. Large, often remote sites need efficient coverage and low false alarms in all weather and light.",
        "The control room must oversee dam, turbine hall, switchyard, and perimeter from one platform. Fragmented systems and limited visibility make operations and emergency response inefficient."
    ]
};

/** Real section names from Synergates solution pages (links.txt). Used for button labels when scenario has no full SCENARIO_CONTENT. */
const SCENARIO_SECTION_NAMES = {
    'classroom-hub': ['In-class applications', 'Remote learning', 'Multi-classroom learning', 'Central management'],
    'urban-roadways': ['Intersections', 'Traffic Lanes', 'Bus Lane', 'Urban roadside', 'Yellow Box Junction', 'Gore Area', 'Command Centers'],
    'stores': ['Entrance', 'Parking Lot', 'Shopping Area', 'Cashiers', 'Inventory', 'IT Room'],
    'bus-stop': ['Anomaly detection', 'Bus stop passenger flow counting', 'Bus stop voice broadcast', 'Illegal parking detection', 'Operation center'],
    'car-dealerships': ['Parking Lots', 'Perimeter', 'Main Entrance', 'Showroom & Maintenance Areas', 'Office', 'Control Room'],
    'conference-rooms': ['Small and Medium-sized Conferencing', 'Medium and Large-sized Conferencing'],
    'highways': ['Highway toll stations', 'Highway traffic lanes', 'Highway ramps', 'Highway shoulders', 'Tunnels', 'Highway command centers'],
    'parking-lots': ['Entrance & Exit Management', 'Indoor Parking Guidance', 'Parking Fee Rules', 'Operation & Management'],
    'shopping-malls': ['Customer Traffic Analytics', 'Commercial Display Advertising', 'General Security', 'Smart Parking Management'],
    'transit-bus-onboard': ['Passenger areas', 'Bus driving cabin', 'Entryway', 'Operation center'],
    'electrical-substations': ['Operations & Maintenance Management', 'Security and Safety Management', 'Centralized System Management'],
    'monitoring-center': ['IT Room', 'Control Room', 'Monitoring Center'],
    'onshore-oilfields': ['Checkpoint', 'Well Pads and Pipelines', 'Processing Plant', 'Vehicles', 'Office Areas'],
    'supermarkets': ['Entrance', 'Parking Lot', 'Shopping Area', 'Cashiers', 'Inventory', 'IT Room'],
    'offshore-oil-platform': ['Platform Perimeter', 'Critical Equipment', 'Control Room'],
    'transmission-line-inspection': ['Corridor Inspection', 'Tower & Line Inspection', 'Field Operation Safety Management', 'Centralized System Management'],
    'pipeline-inspection': ['Pipeline Route', 'Valve Stations', 'Crossings', 'Control Center'],
    'solar-farms': ['Perimeter Security & Vehicle Access', 'Personnel Safety at All Times', 'Efficient Operation & Maintenance', 'Centralized Management'],
    'hydroelectric-power-plants': ['Dam & Reservoir', 'Turbine Hall', 'Switchyard', 'Perimeter', 'Control Center']
};

function getScenarioContent(scenario) {
    const lang = (window.i18n && window.i18n.currentLang === 'fr') ? 'fr' : 'en';
    const useFR = lang === 'fr';
    const SCENARIO_EN = SCENARIO_CONTENT[scenario];
    const SCENARIO_FR = (useFR && typeof window.SCENARIO_CONTENT_FR !== 'undefined') ? window.SCENARIO_CONTENT_FR[scenario] : null;
    let contentSrc = SCENARIO_EN;
    if (SCENARIO_FR && SCENARIO_EN) {
        var merged = JSON.parse(JSON.stringify(SCENARIO_EN));
        merged.intro = SCENARIO_FR.intro || merged.intro;
        if (SCENARIO_FR.sections && SCENARIO_FR.sections.length) {
            merged.sections = merged.sections.map(function(sec, i) {
                var frSec = SCENARIO_FR.sections[i];
                return frSec ? Object.assign({}, sec, frSec) : sec;
            });
        }
        contentSrc = merged;
    } else if (SCENARIO_FR) {
        contentSrc = JSON.parse(JSON.stringify(SCENARIO_FR));
    } else if (SCENARIO_EN) {
        contentSrc = JSON.parse(JSON.stringify(SCENARIO_EN));
    }

    if (contentSrc && contentSrc.sections) {
        const data = contentSrc;
        const challengeImagesList = typeof SECTION_CHALLENGE_IMAGES !== 'undefined' ? SECTION_CHALLENGE_IMAGES[scenario] : null;
        const base = 'images/solution-detail/' + scenario + '/';
        data.sections.forEach(function(sec, i) {
            if (!sec.challengeImg1Url) {
                if (challengeImagesList && challengeImagesList[i]) {
                    const [url1, url2, cap1, cap2] = challengeImagesList[i];
                    if (url1) sec.challengeImg1Url = base + url1.split('/').pop();
                    if (url2) sec.challengeImg2Url = base + url2.split('/').pop();
                } else {
                    sec.challengeImg1Url = base + 's' + i + '-ch1.jpg';
                    sec.challengeImg2Url = base + 's' + i + '-ch2.jpg';
                }
            }
            if (!sec.whatWeOfferBlocks) {
                sec.whatWeOfferBlocks = [
                    { title: (sec.benefits && sec.benefits[0]) ? sec.benefits[0].title : "Integrated solution", description: sec.whatWeOffer || '', bullets: (sec.benefits && sec.benefits[0]) ? sec.benefits[0].items || [] : [], imageUrl: base + 's' + i + '-o0.jpg' },
                    { title: (sec.benefits && sec.benefits[1]) ? sec.benefits[1].title : "Benefits", description: '', bullets: (sec.benefits && sec.benefits[1]) ? sec.benefits[1].items || [] : sec.features || [], imageUrl: base + 's' + i + '-o1.jpg' }
                ];
                sec.whatWeOfferIntro = sec.whatWeOffer || '';
            }
        });
        return data;
    }
    const n = SECTION_COUNTS[scenario] || 4;
    const names = (useFR && typeof window.SCENARIO_SECTION_NAMES_FR !== 'undefined' && window.SCENARIO_SECTION_NAMES_FR[scenario])
        ? window.SCENARIO_SECTION_NAMES_FR[scenario] : (SCENARIO_SECTION_NAMES[scenario] || []);
    const challengesList = (useFR && typeof window.SECTION_CHALLENGES_FR !== 'undefined' && window.SECTION_CHALLENGES_FR[scenario])
        ? window.SECTION_CHALLENGES_FR[scenario] : (SECTION_CHALLENGES[scenario] || []);
    const challengeImagesList = typeof SECTION_CHALLENGE_IMAGES !== 'undefined' ? SECTION_CHALLENGE_IMAGES[scenario] : null;
    const whatWeOfferList = (useFR && typeof window.SECTION_WHAT_WE_OFFER_FR !== 'undefined' && window.SECTION_WHAT_WE_OFFER_FR[scenario])
        ? window.SECTION_WHAT_WE_OFFER_FR[scenario]
        : (typeof SECTION_WHAT_WE_OFFER !== 'undefined' ? SECTION_WHAT_WE_OFFER[scenario] : null);
    const PH = (useFR && typeof window.PLACEHOLDER_SECTION_FR !== 'undefined') ? window.PLACEHOLDER_SECTION_FR : PLACEHOLDER_SECTION;
    const sections = Array.from({ length: n }, (_, i) => {
        const sec = {
            ...PH,
            title: (names && names[i]) ? names[i] : ('Section ' + (i + 1)),
            challenges: (challengesList && challengesList[i]) ? challengesList[i] : PH.challenges
        };
        if (challengeImagesList && challengeImagesList[i]) {
            const [url1, url2, cap1, cap2] = challengeImagesList[i];
            const base = 'images/solution-detail/' + scenario + '/';
            if (url1) sec.challengeImg1Url = base + url1.split('/').pop();
            if (url2) sec.challengeImg2Url = base + url2.split('/').pop();
            if (cap1) sec.challengeImg1 = cap1;
            if (cap2) sec.challengeImg2 = cap2;
        }
        if (whatWeOfferList && whatWeOfferList[i]) {
            sec.whatWeOfferIntro = whatWeOfferList[i].whatWeOfferIntro;
            const base = 'images/solution-detail/' + scenario + '/';
            sec.whatWeOfferBlocks = whatWeOfferList[i].whatWeOfferBlocks.map(b => ({
                ...b,
                imageUrl: b.imageUrl ? base + b.imageUrl.split('/').pop() : null
            }));
        } else {
            sec.whatWeOfferIntro = PH.whatWeOffer;
            const base = 'images/solution-detail/' + scenario + '/';
            const b0 = PH.benefits && PH.benefits[0];
            const b1 = PH.benefits && PH.benefits[1];
            sec.whatWeOfferBlocks = [
                { title: b0 ? b0.title : "Integrated solution", description: sec.whatWeOffer || '', bullets: (b0 && b0.items) || [], imageUrl: base + 's' + i + '-o0.jpg' },
                { title: b1 ? b1.title : "Benefits", description: '', bullets: (b1 && b1.items) || PH.features || [], imageUrl: base + 's' + i + '-o1.jpg' }
            ];
        }
        return sec;
    });
    const OVERVIEWS = (useFR && typeof window.SOLUTION_OVERVIEWS_FR !== 'undefined') ? window.SOLUTION_OVERVIEWS_FR : SOLUTION_OVERVIEWS;
    const DEFAULT_INTRO = (useFR && typeof window.PLACEHOLDER_INTRO_FR !== 'undefined') ? window.PLACEHOLDER_INTRO_FR : PLACEHOLDER_INTRO;
    const intro = OVERVIEWS[scenario] || DEFAULT_INTRO;
    return { intro, sections };
}

/** Fallback image filenames by section type. Path built as images/solution-detail/{scenario}/{filename} */
const IMG = {
    parking: 'photo10.jpg', lobby: 'photo11.jpg',
    reception: 'photo12.jpg', indoor: 'photo13.jpg',
    meeting: 'photo14.jpg', warehouse: 'photo15.jpg',
    perimeter: 'photo3.jpg', control: 'photo8.jpg',
    default: 'photo16.jpg', intersection: 'photo17.jpg',
    traffic: 'photo18.jpg', bus: 'photo17.jpg',
    classroom: 'photo14.jpg', store: 'photo19.jpg',
    highway: 'photo20.jpg', tunnel: 'photo21.jpg',
    solar: 'photo22.jpg', pipeline: 'photo23.jpg',
    dam: 'photo24.jpg', turbine: 'photo25.jpg',
    oilfield: 'photo23.jpg', offshore: 'photo26.jpg',
    transmission: 'photo25.jpg', cashier: 'photo27.jpg',
    command: 'photo8.jpg', roadside: 'photo1.jpg',
    showroom: 'photo28.jpg', conference: 'photo29.jpg',
    substation: 'photo25.jpg', mall: 'photo30.jpg',
    passenger: 'photo17.jpg', driving: 'photo31.jpg',
    entryway: 'photo12.jpg', operation: 'photo8.jpg',
    anomaly: 'photo3.jpg', flow: 'photo18.jpg',
    voice: 'photo16.jpg', guidance: 'photo10.jpg',
    analytics: 'photo8.jpg', advertising: 'photo30.jpg',
    security: 'photo3.jpg', ramp: 'photo18.jpg',
    shoulder: 'photo20.jpg', toll: 'photo10.jpg',
    lane: 'photo18.jpg', gore: 'photo17.jpg',
    yellow: 'photo17.jpg', remote: 'photo14.jpg',
    central: 'photo8.jpg', multi: 'photo14.jpg',
    inclass: 'photo33.jpg', equipment: 'photo25.jpg',
    video: 'photo8.jpg', dock: 'photo15.jpg',
    parcel: 'photo32.jpg', array: 'photo22.jpg',
    inverter: 'photo25.jpg', switchyard: 'photo25.jpg',
    valve: 'photo23.jpg', crossing: 'photo18.jpg',
    line: 'photo25.jpg', tower: 'photo25.jpg',
    corridor: 'photo23.jpg', well: 'photo23.jpg',
    platform: 'photo26.jpg'
};

/** Two contextual image URLs + captions per section. Each card has its own unique image file for admin control. */
const SECTION_CHALLENGE_IMAGES = {
    'classroom-hub': [
        ['images/solution-detail/classroom-hub/s0-ch1.jpg', 'images/solution-detail/classroom-hub/s0-ch2.jpg', 'Limited teaching tools', 'Inefficient classroom setup'],
        ['images/solution-detail/classroom-hub/s1-ch1.jpg', 'images/solution-detail/classroom-hub/s1-ch2.jpg', 'Fixed angle image', 'Complicated camera setup'],
        ['images/solution-detail/classroom-hub/s2-ch1.jpg', 'images/solution-detail/classroom-hub/s2-ch2.jpg', 'Unilateral teaching', 'Scarce resource sharing'],
        ['images/solution-detail/classroom-hub/s3-ch1.jpg', 'images/solution-detail/classroom-hub/s3-ch2.jpg', 'Device management', 'Central configuration']
    ],
    'urban-roadways': [
        ['images/solution-detail/urban-roadways/s0-ch1.jpg', 'images/solution-detail/urban-roadways/s0-ch2.jpg', 'Busy intersection', 'Accidents and violations'],
        ['images/solution-detail/urban-roadways/s1-ch1.jpg', 'images/solution-detail/urban-roadways/s1-ch2.jpg', 'Speeding and congestion', 'Traffic flow prediction'],
        ['images/solution-detail/urban-roadways/s2-ch1.jpg', 'images/solution-detail/urban-roadways/s2-ch2.jpg', 'Illegal bus lane use', 'Illegal parking'],
        ['images/solution-detail/urban-roadways/s3-ch1.jpg', 'images/solution-detail/urban-roadways/s3-ch2.jpg', 'Extended parking', 'Limited enforcement'],
        ['images/solution-detail/urban-roadways/s4-ch1.jpg', 'images/solution-detail/urban-roadways/s4-ch2.jpg', 'Yellow box congestion', 'Violation evidence'],
        ['images/solution-detail/urban-roadways/s5-ch1.jpg', 'images/solution-detail/urban-roadways/s5-ch2.jpg', 'Gore area violations', 'Lack of monitoring'],
        ['images/solution-detail/urban-roadways/s6-ch1.jpg', 'images/solution-detail/urban-roadways/s6-ch2.jpg', 'Data volume', 'Manual operations']
    ],
    'stores': [
        ['images/solution-detail/stores/s0-ch1.jpg', 'images/solution-detail/stores/s0-ch2.jpg', 'Customer traffic data', 'Approaching risks'],
        ['images/solution-detail/stores/s1-ch1.jpg', 'images/solution-detail/stores/s1-ch2.jpg', 'Finding a space', 'Peak hour congestion'],
        ['images/solution-detail/stores/s2-ch1.jpg', 'images/solution-detail/stores/s2-ch2.jpg', 'Customer engagement', 'Asset protection'],
        ['images/solution-detail/stores/s3-ch1.jpg', 'images/solution-detail/stores/s3-ch2.jpg', 'Queue and disputes', 'Transaction security'],
        ['images/solution-detail/stores/s4-ch1.jpg', 'images/solution-detail/stores/s4-ch2.jpg', 'Loss and damage', 'Incident response'],
        ['images/solution-detail/stores/s5-ch1.jpg', 'images/solution-detail/stores/s5-ch2.jpg', 'Data search', 'Cross-application visibility']
    ],
    'bus-stop': [
        ['images/solution-detail/bus-stop/s0-ch1.jpg', 'images/solution-detail/bus-stop/s0-ch2.jpg', 'Rush hour risks', 'Unlawful gathering'],
        ['images/solution-detail/bus-stop/s1-ch1.jpg', 'images/solution-detail/bus-stop/s1-ch2.jpg', 'Long waits', 'Route planning'],
        ['images/solution-detail/bus-stop/s2-ch1.jpg', 'images/solution-detail/bus-stop/s2-ch2.jpg', 'Limited resources', 'Event handling'],
        ['images/solution-detail/bus-stop/s3-ch1.jpg', 'images/solution-detail/bus-stop/s3-ch2.jpg', 'Blocked routes', 'Enforcement without evidence'],
        ['images/solution-detail/bus-stop/s4-ch1.jpg', 'images/solution-detail/bus-stop/s4-ch2.jpg', 'Low efficiency', 'Limited platform functions']
    ],
    'car-dealerships': [
        ['images/solution-detail/car-dealerships/s0-ch1.jpg', 'images/solution-detail/car-dealerships/s0-ch2.jpg', 'Rush hour parking', 'Limited space'],
        ['images/solution-detail/car-dealerships/s1-ch1.jpg', 'images/solution-detail/car-dealerships/s1-ch2.jpg', 'Delayed response', 'Record retrieval'],
        ['images/solution-detail/car-dealerships/s2-ch1.jpg', 'images/solution-detail/car-dealerships/s2-ch2.jpg', 'Unknown trespassers', 'Service response'],
        ['images/solution-detail/car-dealerships/s3-ch1.jpg', 'images/solution-detail/car-dealerships/s3-ch2.jpg', 'Intrusion and risks', 'Emergency response'],
        ['images/solution-detail/car-dealerships/s4-ch1.jpg', 'images/solution-detail/car-dealerships/s4-ch2.jpg', 'Rush hour identity check', 'Attendance disputes'],
        ['images/solution-detail/car-dealerships/s5-ch1.jpg', 'images/solution-detail/car-dealerships/s5-ch2.jpg', 'Various subsystems', 'IT maintenance']
    ],
    'conference-rooms': [
        ['images/solution-detail/conference-rooms/s0-ch1.jpg', 'images/solution-detail/conference-rooms/s0-ch2.jpg', 'Plug-and-play need', 'Configuration time'],
        ['images/solution-detail/conference-rooms/s1-ch1.jpg', 'images/solution-detail/conference-rooms/s1-ch2.jpg', 'Multi-speaker setup', 'Voice pickup and amplification']
    ],
    'electrical-substations': [
        ['images/solution-detail/electrical-substations/s0-ch1.jpg', 'images/solution-detail/electrical-substations/s0-ch2.jpg', 'Lack of qualified inspection personnel', 'Round-the-clock monitoring'],
        ['images/solution-detail/electrical-substations/s1-ch1.jpg', 'images/solution-detail/electrical-substations/s1-ch2.jpg', 'Remote substations vulnerable to intrusions', 'Safety hazards in the workplace'],
        ['images/solution-detail/electrical-substations/s2-ch1.jpg', 'images/solution-detail/electrical-substations/s2-ch2.jpg', 'Lack of unified management platforms', 'Limited visibility into multiple substations']
    ],
    'highways': [
        ['images/solution-detail/highways/s0-ch1.jpg', 'images/solution-detail/highways/s0-ch2.jpg', 'Busy toll station', 'Low-efficiency management'],
        ['images/solution-detail/highways/s1-ch1.jpg', 'images/solution-detail/highways/s1-ch2.jpg', 'Congestion and speeding', 'Traffic prediction'],
        ['images/solution-detail/highways/s2-ch1.jpg', 'images/solution-detail/highways/s2-ch2.jpg', 'Ramp violations', 'Lack of monitoring'],
        ['images/solution-detail/highways/s3-ch1.jpg', 'images/solution-detail/highways/s3-ch2.jpg', 'Emergency lane occupancy', 'Rescue vehicle access'],
        ['images/solution-detail/highways/s4-ch1.jpg', 'images/solution-detail/highways/s4-ch2.jpg', 'Tunnel conditions', 'Incidents in tunnel'],
        ['images/solution-detail/highways/s5-ch1.jpg', 'images/solution-detail/highways/s5-ch2.jpg', 'Data to command center', 'Manual operations']
    ],
    'monitoring-center': [
        ['images/solution-detail/monitoring-center/s0-ch1.jpg', 'images/solution-detail/monitoring-center/s0-ch2.jpg', 'Limited space and budget', 'Limited staff for daily management'],
        ['images/solution-detail/monitoring-center/s1-ch1.jpg', 'images/solution-detail/monitoring-center/s1-ch2.jpg', 'Limited staff, various subsystems', 'Complex IT maintenance'],
        ['images/solution-detail/monitoring-center/s2-ch1.jpg', 'images/solution-detail/monitoring-center/s2-ch2.jpg', 'Various user roles and management tasks', 'Various input/output signal sources and formats']
    ],
    'parking-lots': [
        ['images/solution-detail/parking-lots/s0-ch1.jpg', 'images/solution-detail/parking-lots/s0-ch2.jpg', 'Rush hour congestion', 'Record retrieval'],
        ['images/solution-detail/parking-lots/s1-ch1.jpg', 'images/solution-detail/parking-lots/s1-ch2.jpg', 'Finding a space', 'Locating vehicle'],
        ['images/solution-detail/parking-lots/s2-ch1.jpg', 'images/solution-detail/parking-lots/s2-ch2.jpg', 'Rush hour processing', 'Wrongful charges'],
        ['images/solution-detail/parking-lots/s3-ch1.jpg', 'images/solution-detail/parking-lots/s3-ch2.jpg', 'Lack of video evidence', 'Weak statistics']
    ],
    'shopping-malls': [
        ['images/solution-detail/shopping-malls/s0-ch1.jpg', 'images/solution-detail/shopping-malls/s0-ch2.jpg', 'Tenant mix evaluation', 'Marketing effectiveness'],
        ['images/solution-detail/shopping-malls/s1-ch1.jpg', 'images/solution-detail/shopping-malls/s1-ch2.jpg', 'Lack of attractiveness', 'Navigation guidance'],
        ['images/solution-detail/shopping-malls/s2-ch1.jpg', 'images/solution-detail/shopping-malls/s2-ch2.jpg', 'Blind security spots', 'Emergency response'],
        ['images/solution-detail/shopping-malls/s3-ch1.jpg', 'images/solution-detail/shopping-malls/s3-ch2.jpg', 'Entry congestion', 'Finding a space']
    ],
    'transit-bus-onboard': [
        ['images/solution-detail/transit-bus-onboard/s0-ch1.jpg', 'images/solution-detail/transit-bus-onboard/s0-ch2.jpg', 'Low-definition video', 'Inefficient incident handling'],
        ['images/solution-detail/transit-bus-onboard/s1-ch1.jpg', 'images/solution-detail/transit-bus-onboard/s1-ch2.jpg', 'Insufficient assistance', 'Blind spot risks'],
        ['images/solution-detail/transit-bus-onboard/s2-ch1.jpg', 'images/solution-detail/transit-bus-onboard/s2-ch2.jpg', 'Inaccurate statistics', 'Optimization delay'],
        ['images/solution-detail/transit-bus-onboard/s3-ch1.jpg', 'images/solution-detail/transit-bus-onboard/s3-ch2.jpg', 'Device management', 'Route and schedule']
    ],
    'onshore-oilfields': [
        ['images/solution-detail/onshore-oilfields/s0-ch1.jpg', 'images/solution-detail/onshore-oilfields/s0-ch2.jpg', 'Quick threat response', 'Inefficient access control management'],
        ['images/solution-detail/onshore-oilfields/s1-ch1.jpg', 'images/solution-detail/onshore-oilfields/s1-ch2.jpg', 'Reduced false alarms', '24/7 video monitoring'],
        ['images/solution-detail/onshore-oilfields/s2-ch1.jpg', 'images/solution-detail/onshore-oilfields/s2-ch2.jpg', 'Limited visibility into processing plants', 'Lack of unified management platforms'],
        ['images/solution-detail/onshore-oilfields/s3-ch1.jpg', 'images/solution-detail/onshore-oilfields/s3-ch2.jpg', 'Driver status monitoring', 'Vehicle tracking and coordination'],
        ['images/solution-detail/onshore-oilfields/s4-ch1.jpg', 'images/solution-detail/onshore-oilfields/s4-ch2.jpg', 'Emergency mustering', 'Centralized management']
    ],
    'supermarkets': [
        ['images/solution-detail/supermarkets/s0-ch1.jpg', 'images/solution-detail/supermarkets/s0-ch2.jpg', 'Customer traffic data', 'Approaching risks'],
        ['images/solution-detail/supermarkets/s1-ch1.jpg', 'images/solution-detail/supermarkets/s1-ch2.jpg', 'Finding a space', 'Congestion'],
        ['images/solution-detail/supermarkets/s2-ch1.jpg', 'images/solution-detail/supermarkets/s2-ch2.jpg', 'Customer engagement', 'Asset protection'],
        ['images/solution-detail/supermarkets/s3-ch1.jpg', 'images/solution-detail/supermarkets/s3-ch2.jpg', 'Queue and disputes', 'Transaction security'],
        ['images/solution-detail/supermarkets/s4-ch1.jpg', 'images/solution-detail/supermarkets/s4-ch2.jpg', 'Loss and damage', 'Incident response'],
        ['images/solution-detail/supermarkets/s5-ch1.jpg', 'images/solution-detail/supermarkets/s5-ch2.jpg', 'Data search', 'Cross-application visibility']
    ],
    'offshore-oil-platform': [
        ['images/solution-detail/offshore-oil-platform/s0-ch1.jpg', 'images/solution-detail/offshore-oil-platform/s0-ch2.jpg', 'Remote perimeter', 'Unauthorized vessels'],
        ['images/solution-detail/offshore-oil-platform/s1-ch1.jpg', 'images/solution-detail/offshore-oil-platform/s1-ch2.jpg', 'Critical equipment', 'Tampering and failure'],
        ['images/solution-detail/offshore-oil-platform/s2-ch1.jpg', 'images/solution-detail/offshore-oil-platform/s2-ch2.jpg', 'Unified systems', 'Maintenance']
    ],
    'transmission-line-inspection': [
        ['images/solution-detail/transmission-line-inspection/s0-ch1.jpg', 'images/solution-detail/transmission-line-inspection/s0-ch2.jpg', 'Complex operations in harsh environments', 'Inspection inefficiency'],
        ['images/solution-detail/transmission-line-inspection/s1-ch1.jpg', 'images/solution-detail/transmission-line-inspection/s1-ch2.jpg', 'Safety hazards at heights', 'Difficulty in timely fault detection'],
        ['images/solution-detail/transmission-line-inspection/s2-ch1.jpg', 'images/solution-detail/transmission-line-inspection/s2-ch2.jpg', 'Lack of on-site operation records', 'Difficulty ensuring standardized operations'],
        ['images/solution-detail/transmission-line-inspection/s3-ch1.jpg', 'images/solution-detail/transmission-line-inspection/s3-ch2.jpg', 'Lack of unified management platforms', 'Difficulty ensuring standardized operations']
    ],
    'pipeline-inspection': [
        ['images/solution-detail/pipeline-inspection/s0-ch1.jpg', 'images/solution-detail/pipeline-inspection/s0-ch2.jpg', 'Route monitoring', 'Third-party damage'],
        ['images/solution-detail/pipeline-inspection/s1-ch1.jpg', 'images/solution-detail/pipeline-inspection/s1-ch2.jpg', 'Valve station security', 'Equipment failure'],
        ['images/solution-detail/pipeline-inspection/s2-ch1.jpg', 'images/solution-detail/pipeline-inspection/s2-ch2.jpg', 'Crossing risks', 'Damage and intrusion'],
        ['images/solution-detail/pipeline-inspection/s3-ch1.jpg', 'images/solution-detail/pipeline-inspection/s3-ch2.jpg', 'Central oversight', 'Incident response']
    ],
    'solar-farms': [
        ['images/solution-detail/solar-farms/s0-ch1.jpg', 'images/solution-detail/solar-farms/s0-ch2.jpg', 'Perimeter protection', 'Vehicle management'],
        ['images/solution-detail/solar-farms/s1-ch1.jpg', 'images/solution-detail/solar-farms/s1-ch2.jpg', 'Access control management', 'Personnel safety compliance'],
        ['images/solution-detail/solar-farms/s2-ch1.jpg', 'images/solution-detail/solar-farms/s2-ch2.jpg', 'Standardized inspection process', 'Diversified product mix options'],
        ['images/solution-detail/solar-farms/s3-ch1.jpg', 'images/solution-detail/solar-farms/s3-ch2.jpg', 'Centralized dashboard', 'Visualized data']
    ],
    'hydroelectric-power-plants': [
        ['images/solution-detail/hydroelectric-power-plants/s0-ch1.jpg', 'images/solution-detail/hydroelectric-power-plants/s0-ch2.jpg', 'Dam and reservoir', 'Seepage and intrusion'],
        ['images/solution-detail/hydroelectric-power-plants/s1-ch1.jpg', 'images/solution-detail/hydroelectric-power-plants/s1-ch2.jpg', 'Turbine hall', 'Safety and theft'],
        ['images/solution-detail/hydroelectric-power-plants/s2-ch1.jpg', 'images/solution-detail/hydroelectric-power-plants/s2-ch2.jpg', 'Switchyard', 'Access and faults'],
        ['images/solution-detail/hydroelectric-power-plants/s3-ch1.jpg', 'images/solution-detail/hydroelectric-power-plants/s3-ch2.jpg', 'Plant perimeter', 'Remote sites'],
        ['images/solution-detail/hydroelectric-power-plants/s4-ch1.jpg', 'images/solution-detail/hydroelectric-power-plants/s4-ch2.jpg', 'Control room', 'Fragmented systems']
    ]
};

/** "What we offer" per section: intro + blocks (title, description, bullets, imageUrl). One entry per section; used for placeholder scenarios. */
const SECTION_WHAT_WE_OFFER = {
    'electrical-substations': [
        {
            whatWeOfferIntro: "Synergates uses cutting-edge technologies and products to monitor electrical operations in substations. With advanced solutions, Synergates provides a reliable layer of security and assists managers in predicting operational failures through intelligent video analyses.",
            whatWeOfferBlocks: [
                { title: "Critical asset monitoring", description: "Deliver video imaging of critical assets with real-time status updates. Video streaming integrates SCADA data to boost situational awareness. Add visibility to electrical installations with AR Live Interaction; leverage positioning, PTZ, and covert network cameras; provide panoramic and detailed imaging of transformers, isolating switches, control panels and more.", bullets: ["Add visibility to electrical installations with AR Live Interaction", "Leverage positioning, PTZ, and covert network cameras", "Provide panoramic and detailed imaging of transformers and control panels", "Integrate SCADA data for situational awareness"], imageUrl: "images/solution-detail/s0-o0.jpg" },
                { title: "Infrared thermography", description: "Detect temperature anomalies and fires in the early stages and send timely notifications, minimizing losses and unnecessary downtime. Set configurable rules and get event reports; offer clear imaging with heat distribution maps; measure temperatures from a safe distance.", bullets: ["Detect temperature anomalies and fires in early stages", "Configurable rules and event reports", "Clear imaging with heat distribution maps", "Measure temperatures from a safe distance"], imageUrl: "images/solution-detail/s0-o1.jpg" },
                { title: "AI-powered analytics and intelligent inspections", description: "Empower cameras and edge devices with AI capability to detect status of electrical assets. Automate meter and indicator light reading; make isolating switch status, LEDs, or digital meters clearly visible. Provide analysis and reports with Synergates Central platforms; enable online planning, real-time response, and remote checks via high-definition cameras.", bullets: ["Automate meter and indicator light reading", "Make isolating switch status and digital meters clearly visible", "Analysis and reports with Synergates Central platforms", "Online planning, real-time response, and remote checks"], imageUrl: "images/solution-detail/s0-o2.jpg" }
            ]
        },
        {
            whatWeOfferIntro: "Synergates offers smart cameras, radar units, and other advanced tools for substation security. These innovative products help protect the well-being of employees, while real-time detections and quick alerts from a video-based security system enable rapid incident response and reduce risks and costs.",
            whatWeOfferBlocks: [
                { title: "Perimeter protections", description: "Synergates has your perimeter and critical areas covered with all-around protection 24/7, alerting your staff to any security breach.", bullets: ["24/7 perimeter and critical area protection", "Alert staff to any security breach", "Real-time detection and quick alerts"], imageUrl: "images/solution-detail/s1-o0.jpg" },
                { title: "Entrance & exit controls", description: "Synergates's barrier gates and facial recognition terminals provide smart entrance and exit controls, limiting access to authorized personnel and minimizing loss and other hazards in specific areas.", bullets: ["Smart entrance and exit controls", "Limit access to authorized personnel", "Minimize loss and hazards in specific areas"], imageUrl: "images/solution-detail/s1-o1.jpg" },
                { title: "PPE detections and abnormal activity detections", description: "Synergates's remote PPE checks use video imaging to verify helmets and other protective gear are in use. Falling, running, unsafe gathering, and other abnormal activity can be detected so managers can act promptly to reduce the risk of unnecessary accidents.", bullets: ["Verify helmets and protective gear via video", "Detect falling, running, unsafe gathering", "Improve safety and compliance with industry regulations", "Managers can act promptly to reduce accidents"], imageUrl: "images/solution-detail/s1-o2.jpg" }
            ]
        },
        {
            whatWeOfferIntro: "Synergates offers centralized management solution for substations. With centralized data collection and analysis, operators can gain insights into operational performance and address security risks quickly.",
            whatWeOfferBlocks: [
                { title: "Process monitoring", description: "Improves situational awareness and enhances overall efficiency. Tracks the entire operational process; integrated SCADA data with readable tags; excellent video imaging in real time.", bullets: ["Track the entire operational process", "Integrated SCADA data with readable tags", "Excellent video imaging in real time", "Improve situational awareness"], imageUrl: "images/solution-detail/s2-o0.jpg" },
                { title: "Alarm handling", description: "Takes timely action to avoid potential risks. Enable timely emergency dispatch; receive alarm notifications in real time and verify through video imaging.", bullets: ["Enable timely emergency dispatch", "Receive alarm notifications in real time", "Verify through video imaging", "Take timely action to avoid risks"], imageUrl: "images/solution-detail/s2-o1.jpg" },
                { title: "Visualized dashboard", description: "Provides crystal clear insights using visualized data. Equip operational teams with a bird's eye view and multidimensional analytics; monitor from an all-inclusive dashboard with perceived data; get real-time inspection status of ongoing site operations.", bullets: ["Bird's eye view and multidimensional analytics", "All-inclusive dashboard with perceived data", "Real-time inspection status of ongoing operations", "Crystal clear insights using visualized data"], imageUrl: "images/solution-detail/s2-o2.jpg" }
            ]
        }
    ],
    'monitoring-center': [
        {
            whatWeOfferIntro: "Powerful, reliable data storage and display with all subsystems unified on one platform for monitoring, incident handling, remote control, evidence collection, and maintenance. Synergates makes IT room management simpler and more efficient.",
            whatWeOfferBlocks: [
                { title: "Flexible display and layout", description: "Flexible display schedule and layout templates for informative, effective display and control with lower costs. Diverse professional options to meet unique installation requests and performance expectations; all-day reliable operation with high image clarity.", bullets: ["Flexible display schedule and layout templates", "Informative, effective display with lower costs", "Diverse professional options for unique installations", "All-day reliable operation with high image clarity"], imageUrl: "images/solution-detail/s0-o0.jpg" },
                { title: "VESA compliant monitors", description: "Up to 4 display screen output per Synergates Central Professional server. Desktop or wall-mounted monitor screens from 1080p to 4K.", bullets: ["Up to 4 display screen output per server", "Desktop or wall-mounted from 1080p to 4K", "VESA compliant monitors"], imageUrl: "images/solution-detail/s0-o1.jpg" }
            ]
        },
        {
            whatWeOfferIntro: "Professional video wall display with all subsystems unified on one platform for monitoring, incident handling, remote control, evidence collection, and maintenance can make control room management simpler and more efficient.",
            whatWeOfferBlocks: [
                { title: "Video wall and decoding", description: "Flexible display schedule and layout templates; powerful decoding performance; diverse professional choices to meet unique installation requests. All-day reliable operation with high clarity; large number of concurrent camera display. VESA compliant monitors; desktop or wall-mounted from 1080p to 4K; support up to 4x4 LCD video wall features.", bullets: ["Flexible display schedule and layout templates", "Powerful decoding performance", "Support up to 4x4 LCD video wall features", "Large number of concurrent camera display"], imageUrl: "images/solution-detail/s1-o0.jpg" }
            ]
        },
        {
            whatWeOfferIntro: "Powerful, reliable storage and display with all subsystems unified on one platform for monitoring, incident handling, remote control, evidence collection and maintenance can make monitor room management simpler and more efficient.",
            whatWeOfferBlocks: [
                { title: "Professional content management", description: "Various professional choices to meet unique installation requests and performance expectations. Multiple concurrent camera displays; support various signals and output format; powerful large-scale LCD video wall and decoding performance. Professional content management of display schedule and layout templates; 24/7 reliability with high clarity; support a large number of LCD/LED screens.", bullets: ["Professional content management of display schedule and layout", "24/7 reliability with high clarity", "Support a large number of LCD/LED screens", "Multiple concurrent camera displays"], imageUrl: "images/solution-detail/s2-o0.jpg" }
            ]
        }
    ],
    'classroom-hub': [
        { whatWeOfferIntro: "Our Classroom Hub extends real classrooms to digital and virtual ones, bridging gaps between teaching and learning. Smart teaching tools and easy-to-use software help educators deliver more engaging lessons and reach more students. Teachers can move beyond traditional chalk and whiteboard to create rich, interactive content and share it across devices and classrooms.", whatWeOfferBlocks: [
            { title: "Interactive flat panel", description: "A digital teaching tool that integrates touch controls, HD display, and access to third-party teaching resources. Teachers can create rich digital instruction and collaborate with students on one device. The panel supports multiple users at once and connects easily to personal devices for wireless projection and content sharing.", bullets: ["Up to 20-point IR touch for multi-user interaction", "Wireless projection from smartphone, tablet, or PC", "Filters blue light to protect students' eyes", "Abundant third-party teaching resources and apps"], imageUrl: "images/solution-detail/s0-o0.jpg" },
            { title: "Flexible whiteboard software", description: "Create and share digital instruction with powerful visual experiences. Openness to third-party apps and multi-terminal projection supports a wide range of teaching styles and content. Educators can explore more possibilities than with a traditional blackboard while keeping lessons engaging and easy to follow.", bullets: ["Explore more possibilities with third-party apps", "Powerful visual experiences beyond traditional blackboard", "Multi-terminal projection support for group work", "Flexible program creation and publishing"], imageUrl: "images/solution-detail/s0-o1.jpg" }
        ]},
        { whatWeOfferIntro: "Remote learning solutions share class instruction with students who are not in the classroom. Professional AI-enabled cameras and software keep engagement high and setup simple, with compatibility for mainstream conferencing tools.", whatWeOfferBlocks: [
            { title: "Teacher camera and ClassIn", description: "Share teaching scenarios and courseware in real time with students who are not in the classroom.", bullets: ["Camera tracking and close-up shot", "High definition images from teacher and panel", "Works with Zoom, Webex and more"], imageUrl: "images/solution-detail/s1-o0.jpg" },
            { title: "Smooth view switching", description: "Switch from teacher to whiteboard in excellent image quality for an immersive environment.", bullets: ["Up to 1080p quality", "Simple configuration", "High compatibility"], imageUrl: "images/solution-detail/s1-o1.jpg" }
        ]},
        { whatWeOfferIntro: "Multi-classroom learning enables synchronized teaching among multiple classrooms so more students can access the best educational content.", whatWeOfferBlocks: [
            { title: "Synchronized teaching", description: "Teaching materials, audio and annotations on the Interactive Flat Panel sync to other classrooms in real time.", bullets: ["Main classroom interacts with three secondary classrooms", "ClassLink for flexible teaching views", "Same level of resources for remote areas"], imageUrl: "images/solution-detail/s2-o0.jpg" },
            { title: "Student feedback", description: "Teachers can notice all students' feedback in main and secondary classrooms to guarantee quality.", bullets: ["Better engagement", "Gauge reaction to lessons", "Improve teaching quality"], imageUrl: "images/solution-detail/s2-o1.jpg" }
        ]},
        { whatWeOfferIntro: "FocSign software enables batch configuration and central management of multiple Interactive Flat Panels across schools.", whatWeOfferBlocks: [
            { title: "Batch configuration", description: "Remotely manage multiple panels: parameter setting, information display, and rapid installation of applications.", bullets: ["One-click install for multiple devices", "Short messages to multiple devices", "Remote shutdown, reboot, restore"], imageUrl: "images/solution-detail/s3-o0.jpg" },
            { title: "Administrative efficiency", description: "Boost administrative efficiency and make the most of classroom time with centralized control.", bullets: ["Two information display modes", "Rapid delivery of updates", "Power saving and safety"], imageUrl: "images/solution-detail/s3-o1.jpg" }
        ]}
    ],
    'parking-lots': [
        { whatWeOfferIntro: "Smooth entry and exit with authorized license plates and easy-to-retrieve vehicle records for efficient parking management. Our solutions help reduce rush hour congestion, simplify evidence collection when disputes arise, and give operators clear visibility into vehicle flow and occupancy. Whether you run a single lot or many sites, the same platform can support flexible fee rules, remote center calling, and detailed reporting.", whatWeOfferBlocks: [
            { title: "Entrance & Exit management", description: "ANPR-empowered products support block-list alarm, vehicle counting, and hands-free passage so that authorized vehicles move through quickly while unauthorized or flagged vehicles are identified. Rush hour congestion is reduced and staff can focus on exceptions rather than every vehicle.", bullets: ["Rush hour congestion relief and smoother flow", "Simplified evidence collection for disputes", "Vehicle records and retrieval with fuzzy plate match", "Support for remote center calling when booth is off-duty"], imageUrl: "images/solution-detail/s0-o0.jpg" },
            { title: "Vehicle records", description: "Recording of vehicle license plates, images, and video with fuzzy match and event filter makes it easy to find a vehicle of interest and resolve disputes. Manual license correction and blocklist management give operators the control they need for daily operations.", bullets: ["Call remote center when booth is off-duty", "Manual license correction and barrier control", "Blocklist alarm and passing vehicle monitoring", "Statistics and reports for operational insight"], imageUrl: "images/solution-detail/s0-o1.jpg" }
        ]},
        { whatWeOfferIntro: "Indoor parking guidance helps drivers find vacant spaces quickly and locate their vehicle with self-service inquiry and multi-color indications. Parking guidance cameras feed real-time occupancy data so that signs and indicators always show accurate counts. In large or multi-level car parks, this reduces circling time and stress and improves throughput during peak hours.", whatWeOfferBlocks: [
            { title: "Parking guidance system", description: "Display vacant parking spaces in each direction with data from parking guidance cameras. The system improves rush hour efficiency and gives drivers a clear view of where spaces are available without having to drive every aisle.", bullets: ["Improved rush hour efficiency and less circling", "Self-service inquiry of vehicle location", "Multi-color light indications for quick scanning", "Real-time occupancy per zone and level"], imageUrl: "images/solution-detail/s1-o0.jpg" },
            { title: "Visual guidance", description: "Full-cycle visual guidance so drivers quickly find spaces and locate where they parked. Display numbers and locations of available spaces with clear directions, reducing time spent searching and making large car parks easier to navigate.", bullets: ["Display numbers and locations of available spaces", "Direction to free spaces and wayfinding", "Less stress in large car parks", "Find-my-car self-service inquiry"], imageUrl: "images/solution-detail/s1-o1.jpg" }
        ]},
        { whatWeOfferIntro: "Flexible parking fee rules and retrievable payment records support most fee policies and help speed up operations while preventing loss. Discounts, coupons, cards, and tickets can be configured to match your business rules, and payment data is stored for reporting and dispute resolution. Intuitive data-driven management and anti-fraud features give operators better control over revenue and exceptions.", whatWeOfferBlocks: [
            { title: "Fee rule configuration", description: "Support for discount, coupon, card and ticket cost management and personalized payment rules. Pay at Exit, prepay at toll station, or account top-up are supported, with license plate record linkage and automatic receipt display for a smooth customer experience.", bullets: ["Pay at Exit, prepay at toll station or account top-up", "License plate record support and receipt display", "Discount, coupon, and membership rules", "Commonly-used fee configuration templates"], imageUrl: "images/solution-detail/s2-o0.jpg" },
            { title: "Loss prevention", description: "Enhanced operation with data-driven management and anti-fraud tactics. Reports and dashboards highlight anomalies and exceptions so that loss prevention and revenue protection can be improved while keeping daily configuration simple.", bullets: ["Intuitive data-driven management and reporting", "Boost loss prevention and revenue protection", "Commonly-used fee configuration and overrides", "Audit trail for transactions and manual interventions"], imageUrl: "images/solution-detail/s2-o1.jpg" }
        ]},
        { whatWeOfferIntro: "Management statistics and detailed records for entry and exit, vehicle flow, and space utilization help operators maximize efficiency and resolve disputes quickly with clear evidence.", whatWeOfferBlocks: [
            { title: "Operation and transaction reports", description: "Detailed entry and exit records, statistics on vehicle flow, and space utilization support daily operations and audits. Video and plate records provide reliable evidence for disputes.", bullets: ["Video record for dispute settlement", "Vehicle records retrieval with plate recognition", "Customizable access rules and reporting"], imageUrl: "images/solution-detail/s3-o0.jpg" },
            { title: "Visual management", description: "Diverse reports and dashboards help explore operational insights and optimize effectiveness across the parking site.", bullets: ["Charges and visual management", "Operational insights for better decisions", "Efficient parking operation and revenue tracking"], imageUrl: "images/solution-detail/s3-o1.jpg" }
        ]}
    ],
    'urban-roadways': [
        { whatWeOfferIntro: "Our Urban Roadways solution provides multi-scene monitoring and unlawful driving supervision to reduce violations, protect citizens, and keep city roads safe. Intelligent software and high-definition evidence support consistent enforcement and faster response. Live video at intersections and key locations captures violations and collects evidence that can be used for citations and dispute resolution, while all-in-one and flexible deployment options adapt to different sites and budgets.", whatWeOfferBlocks: [
            { title: "Intersection violation detection", description: "Live video at intersections captures violations and collects high-definition evidence. Cameras can also act as a visible warning to drivers who break traffic rules.", bullets: ["Standardize law enforcement and reduce disputes", "Detect red light running, wrong-way driving, and more", "Abundant vehicle data: LPR, color, brand, type"], imageUrl: "images/solution-detail/s0-o0.jpg" },
            { title: "All-in-one and flexible deployment", description: "Solutions with capture units or all-rounder traffic cameras adapt to different sites and budgets. Signal detectors and strobe lights integrate for complete intersection coverage.", bullets: ["All-in-one design to reduce installation costs", "Multiple violation types from one system", "Evidence and alerts for timely response"], imageUrl: "images/solution-detail/s0-o1.jpg" }
        ]},
        { whatWeOfferIntro: "Speed monitoring and traffic data detection help manage traffic lanes more safely and efficiently. Real-time speed calculation and traffic flow analysis support enforcement and smarter traffic guidance.", whatWeOfferBlocks: [
            { title: "Speed monitoring system", description: "Calculate vehicle speeds in real time and collect evidence of speeding for deterrence and law enforcement. High accuracy and flexible deployment support both fixed and portable use.", bullets: ["Standardize law enforcement and reduce manual disputes", "Warn drivers in advance at tunnels and critical sections", "Abundant vehicle feature data and forensic evidence"], imageUrl: "images/solution-detail/s1-o0.jpg" },
            { title: "Traffic information detection", description: "Live traffic data helps traffic police make better decisions. Detect and report road status—smooth, slow, or congested—and forecast flow to relieve congestion.", bullets: ["Real-time traffic conditions for better guidance", "Forecast traffic flow and detect congestion", "Data on flow, speed, queue, and occupancy"], imageUrl: "images/solution-detail/s1-o1.jpg" }
        ]},
        { whatWeOfferIntro: "Bus lane monitoring captures violations and collects evidence so bus lanes stay clear. Automatic upload and vehicle feature detection support efficient, remote enforcement.", whatWeOfferBlocks: [
            { title: "Bus lane monitoring", description: "24/7 video captures bus lane violations and collects evidence. Vehicle feature detection and illegal parking detection help keep bus lanes clear and support enforcement.", bullets: ["Standardize law enforcement and ease strain on personnel", "Automatic image upload of violating vehicles", "Wide-area coverage with clear close-up images"], imageUrl: "images/solution-detail/s2-o0.jpg" },
            { title: "Illegal parking detection", description: "Accurate detection of illegally parked vehicles with ultra-clear close-up images. Auto-switching and multi-scene detection cover wide areas.", bullets: ["Support automatic upload for evidence management", "Vehicle feature data: LPR, color, type", "Keep bus lanes and roadside clear"], imageUrl: "images/solution-detail/s2-o1.jpg" }
        ]},
        { whatWeOfferIntro: "Urban roadside space is limited; extended parking and lack of enforcement create congestion. Live video captures roadside parking violations and collects high-definition evidence for remote management and citations.", whatWeOfferBlocks: [
            { title: "Urban roadside parking management", description: "Live video 24/7 captures parking violations and collects high-definition evidence. Accurate detection of parked vehicles with clear imagery supports remote enforcement.", bullets: ["Reduce illegal parking on urban roadsides", "Video-based remote detection and management", "Structured data for quick search and evidence"], imageUrl: "images/solution-detail/s3-o0.jpg" },
            { title: "Enforcement efficiency", description: "Standardize law enforcement and prevent congestion. Keep vehicles moving and free roadside space for short-stay and emergency use.", bullets: ["Prevent traffic congestion and keep flow smooth", "Evidence for citations and disputes", "Reduce extended parking violations"], imageUrl: "images/solution-detail/s3-o1.jpg" }
        ]},
        { whatWeOfferIntro: "Yellow box junctions at intersections and near schools or hospitals must stay clear. Live video captures violations and collects evidence, acting as a visible warning and supporting consistent enforcement.", whatWeOfferBlocks: [
            { title: "Yellow box junction violation detection", description: "Live video at yellow box junctions captures violations and collects evidence. Systems act as a visible warning to drivers and support consistent enforcement.", bullets: ["Improve safety and order at intersections", "Reduce violations and accident rates", "Vehicle feature data for evidence and search"], imageUrl: "images/solution-detail/s4-o0.jpg" },
            { title: "Congestion and compliance", description: "Detect vehicles entering the yellow box when congestion is present. Regulate traffic and provide safety guarantees for drivers and pedestrians.", bullets: ["Standardize law enforcement", "Prevent conflicts between police and citizens", "Clear evidence for dispute resolution"], imageUrl: "images/solution-detail/s4-o1.jpg" }
        ]},
        { whatWeOfferIntro: "Gore areas guide drivers to prescribed routes; crossing them increases accidents and congestion. 24/7 video captures violations and records the full process at ramps for enforcement and safety.", whatWeOfferBlocks: [
            { title: "Gore area crossing detection", description: "24/7 video at gore areas captures crossing violations and records the full violation process. Regulate driving behavior at ramps and reduce accidents.", bullets: ["Standardize law enforcement processes", "Reduce disputes from manual intervention", "Full violation process recorded for evidence"], imageUrl: "images/solution-detail/s5-o0.jpg" },
            { title: "Ramp and approach safety", description: "Abundant vehicle feature data supports LPR, color, type, and brand. Reduce ramp violations and improve traffic safety at entrances and exits.", bullets: ["Regulate driving at ramps and reduce accident ratio", "Quick evidence for incident resolution", "Support for entrance and exit ramp monitoring"], imageUrl: "images/solution-detail/s5-o1.jpg" }
        ]},
        { whatWeOfferIntro: "Command centers need to manage large numbers of devices and complex processes. Our software and hardware are integrated as one full-stack system, with a modular and customizable platform for all urban roadway scenarios.", whatWeOfferBlocks: [
            { title: "Command center platform", description: "Comprehend real-time urban road status for smart decision-making and efficient enforcement. Centralize huge amounts of complex data with dashboards, alarm management, and violation handling.", bullets: ["Centralized system for all devices and resources", "Vehicle attribute search and alarm center", "Statistics analysis and key information dashboards"], imageUrl: "images/solution-detail/s6-o0.jpg" },
            { title: "Violation and incident management", description: "Manage violations with improved enforcement efficiency. Rapidly locate vehicles and handle incidents with clear evidence and workflow integration.", bullets: ["Violation management and enforcement efficiency", "Quick vehicle location by plate or attributes", "Unified view of road status and events"], imageUrl: "images/solution-detail/s6-o1.jpg" }
        ]}
    ],
    'stores': [
        { whatWeOfferIntro: "We combine reliable video security with intelligent analytics to support daily store management. From entrance to checkout, our solutions help you understand customer flow, prevent loss, and improve service—with clear evidence when you need it. Precise customer-visit data and traffic analysis at the entrance help optimize operations and marketing, while AI-powered tools can evaluate the effectiveness of campaigns and monitor approaching risks so staff can act before incidents occur.", whatWeOfferBlocks: [
            { title: "Customer traffic analytics", description: "Precise customer-visit data and traffic analysis at the entrance help optimize operations and marketing. Evaluate the effectiveness of campaigns and monitor approaching risks with AI-powered tools. Multi-camera statistics and configurable reports support various aspects of store performance, from walk-in rates to peak-hour patterns.", bullets: ["Multi-camera statistics and report exporting", "Evaluate marketing events and walk-in rates", "Configurable reports for various aspects", "Peak-hour and zone-level traffic insights"], imageUrl: "images/solution-detail/s0-o0.jpg" },
            { title: "Enhanced loss prevention", description: "Identify suspicious individuals and receive early alerts for known shoplifters. Real-time alarm via mobile app and VIP or risk notification keep staff informed without disrupting customers. Video verification is available for every alert so that responses are accurate and evidence is ready for follow-up or law enforcement.", bullets: ["Identify suspicious people via AI recognition", "Shoplifter alarm and early alerts", "Real-time alarm and video verification", "VIP and risk notification to staff devices"], imageUrl: "images/solution-detail/s0-o1.jpg" }
        ]},
        { whatWeOfferIntro: "Parking and indoor guidance create a strong first impression and reduce congestion. Non-stop entry and exit, flexible payment, and easy vehicle location help customers start their visit smoothly.", whatWeOfferBlocks: [
            { title: "Entrance & exit management", description: "Smooth entry and exit with ANPR and flexible payment options. Simplified evidence collection and detailed vehicle records support operations and dispute resolution.", bullets: ["Automatic license plate recognition and recording", "Flexible parking fee payment, online or offline", "Quick, convenient payment and traffic efficiency"], imageUrl: "images/solution-detail/s1-o0.jpg" },
            { title: "Indoor parking guidance", description: "Help customers find available spaces and locate their vehicle quickly. Visualized maps and multi-color indications improve rush-hour efficiency and reduce stress in large lots.", bullets: ["Visualized map on vehicle inquiry terminal", "Multi-color light indications of space status", "Vacant spaces on guidance screens"], imageUrl: "images/solution-detail/s1-o1.jpg" }
        ]},
        { whatWeOfferIntro: "Shopping area security and analytics protect staff, customers, and assets while supporting layout and merchandising decisions. Wide-area HD video and heat-map analysis help you understand how customers move and engage.", whatWeOfferBlocks: [
            { title: "Video security", description: "No blind spots with wide-area HD coverage. Emergency handling and two-way video intercom add an extra layer of safety and support.", bullets: ["24/7 high-quality video and all-day protection", "Dual-direction monitoring and PTZ options", "360° panoramic and fisheye options"], imageUrl: "images/solution-detail/s2-o0.jpg" },
            { title: "Heat-map and analytics", description: "Understand customer distribution and dwell time. Use graphical reports to adjust layout, shelving, and service quality for better engagement and sales.", bullets: ["Graphical reports of frequency and dwell time", "Identify high-attention spots", "Arrange shelves and promotions by data"], imageUrl: "images/solution-detail/s2-o1.jpg" }
        ]},
        { whatWeOfferIntro: "At the cashier, video security supports transaction verification, queue management, and loss prevention. Visual verification and timely alarms help shorten wait times and resolve disputes quickly.", whatWeOfferBlocks: [
            { title: "Visual verification", description: "Video verification for POS transaction records and search by transaction keywords with fuzzy match. Increase efficiency when investigating disputes and resolving customer issues.", bullets: ["Video verification for POS transaction records", "Search by transaction keywords, fuzzy match", "Visual audit to resolve disputes faster"], imageUrl: "images/solution-detail/s3-o0.jpg" },
            { title: "Queue and loss prevention", description: "Optimize queuing experience with automatic alarm on queue overrun or when staff is insufficient. Integrate with EAS or intrusion alarm to verify shoplifted items and reduce loss.", bullets: ["Shorter wait times and better experience", "Flexible detection areas and HD low-light video", "Real-time alarm on mobile or web client"], imageUrl: "images/solution-detail/s3-o1.jpg" }
        ]},
        { whatWeOfferIntro: "Inventory and back-office areas benefit from access control, 24/7 video, and early alarms. Touch-free access, temperature and intrusion detection, and video verification help prevent loss and respond to incidents quickly.", whatWeOfferBlocks: [
            { title: "Access and alarm", description: "Touch-free, anti-spoofing access with video verification. Temperature anomaly and intrusion alarms with instant push and HD video for verification.", bullets: ["Video verification for temperature, intrusion, access", "Wireless alarm detectors, easy to deploy", "Early pre-warnings for fire and threats"], imageUrl: "images/solution-detail/s4-o0.jpg" },
            { title: "24/7 coverage", description: "Wide-area HD video and optional thermal imaging for cold storage and sensitive areas. All-round coverage with fisheye and multi-lens options.", bullets: ["24/7 wide area HD video", "Cryogenic camera for cold storage", "Fisheye and multi-lens for full coverage"], imageUrl: "images/solution-detail/s4-o1.jpg" }
        ]},
        { whatWeOfferIntro: "IT and control rooms combine multiple subsystems. A unified platform with customizable UI and clear dashboards helps operators manage video, access, alarm, and attendance from one place—with remote audit and evidence when needed.", whatWeOfferBlocks: [
            { title: "Unified management & dashboard", description: "All subsystems on one platform with custom layout and health monitoring. High-clarity displays and video walls for visualized management.", bullets: ["Centralized management of video, access, alarm, attendance", "System and device health dashboards", "Custom UI and bird's-eye view"], imageUrl: "images/solution-detail/s5-o0.jpg" },
            { title: "Remote audit", description: "Picture and video audit for different requirements. Remotely check the situation of the store for audits with captured images and zoom for details.", bullets: ["Picture and video audit for different needs", "Captured images from multiple angles", "Zoom to view details remotely"], imageUrl: "images/solution-detail/s5-o1.jpg" }
        ]}
    ],
    'onshore-oilfields': [
        { whatWeOfferIntro: "Synergates addresses checkpoint challenges by offering cutting-edge technologies and products. These tools help monitor passing vehicles and personnel at checkpoints, identify potential threats, and allow for quick responses, aiding in enhancing fleet efficiency.", whatWeOfferBlocks: [
            { title: "Automatic speed measurement", description: "Synergates's automatic speed measurement system monitors passing vehicles to ensure safe driving. Speeding violations are reported to the command center and displayed on an LED screen.", bullets: ["Monitor passing vehicles for safe driving", "Speeding violations reported to command center", "Display on LED screen"], imageUrl: "images/solution-detail/s0-o0.jpg" },
            { title: "Entrance & exit management", description: "Synergates's barrier gate system efficiently manages entrances and exits by detecting and recording vehicle information. Only authorized vehicles are allowed, further securing the site.", bullets: ["ANPR camera and barrier", "Detect and record vehicle information", "Only authorized vehicles allowed"], imageUrl: "images/solution-detail/s0-o1.jpg" },
            { title: "Personnel access control", description: "The employee authentication system uses biometric information to ensure accurate staff access records and enhance the security of the oilfield. The online visitor management system provides full-journey control over all personnel.", bullets: ["Biometric authentication", "Accurate staff access records", "Full-journey visitor control"], imageUrl: "images/solution-detail/s0-o2.jpg" }
        ]},
        { whatWeOfferIntro: "Synergates provides a comprehensive intrusion detection system to protect vulnerable and valuable infrastructure. Deep learning algorithms help reduce false alarms caused by animals, rain drops, or leaves; 24/7 video monitoring detects pipeline attacks and damage with real-time notifications.", whatWeOfferBlocks: [
            { title: "Reduced false alarms", description: "By leveraging deep learning algorithms, Synergates's cameras can help reduce false alarms caused by animals, rain drops, or leaves, and only send alarms triggered by detection of persons or vehicles.", bullets: ["Deep learning reduces false alarms", "Detection of persons or vehicles only", "Explosion-proof and thermal cameras"], imageUrl: "images/solution-detail/s1-o0.jpg" },
            { title: "24/7 video monitoring", description: "Synergates's 360-degree video monitoring detects pipeline attacks and damage, with real-time notifications for timely emergency response. Cost-effective solar-powered cameras are designed for extreme environments.", bullets: ["360-degree video monitoring", "Real-time notifications", "Solar-powered for remote installations"], imageUrl: "images/solution-detail/s1-o1.jpg" }
        ]},
        { whatWeOfferIntro: "Synergates uses leading products and platforms to maximize productivity and staff efficiency at processing plants. Explosion-proof cameras offer comprehensive security detection; thermography and gas leakage detection ensure safety; AI-based devices verify PPE and support intelligent inspections.", whatWeOfferBlocks: [
            { title: "Process monitoring", description: "Explosion-proof cameras offer comprehensive security detection with panoramic and detailed views. The CCTV system integrates with industrial control systems like SCADA for remote video check-ins and daily assurance.", bullets: ["Panoramic and detailed views", "Integration with SCADA", "24/7 real-time monitoring"], imageUrl: "images/solution-detail/s2-o0.jpg" },
            { title: "Personnel safety compliance and intelligent inspections", description: "Synergates's AI-based devices verify the presence of personal protective equipment. Cutting-edge AI technologies, video imaging, and software support inspections of facilities throughout the field with traceable, regulated, efficient processes.", bullets: ["PPE verification via AI", "Traceable inspection process", "Online planning and real-time response"], imageUrl: "images/solution-detail/s2-o1.jpg" }
        ]},
        { whatWeOfferIntro: "Synergates offers comprehensive mobile monitoring systems to protect people and prevent accidents when driving at oil field sites. Real-time vehicle monitoring enhances traditional GPS with video; driver status monitoring uses AI analytics to prevent fatigued driving or phone use.", whatWeOfferBlocks: [
            { title: "Real-time vehicle monitoring", description: "Enhances traditional GPS positioning with video monitoring to preserve evidence for incident review. In-car alarm buttons also ensure driving safety.", bullets: ["Video monitoring with GPS", "Evidence for incident review", "In-car alarm buttons"], imageUrl: "images/solution-detail/s3-o0.jpg" },
            { title: "Driver status monitoring", description: "Uses specially-designed AI analytics products to effectively prevent dangers such as fatigued driving or phone use.", bullets: ["AI analytics for driver status", "Prevent fatigued driving", "Phone use detection"], imageUrl: "images/solution-detail/s3-o1.jpg" }
        ]},
        { whatWeOfferIntro: "With the right tools and technologies from Synergates, we help create an organized, safe and productive work environment. Emergency mustering gathers personnel in a safe place during emergencies; the video wall and visual data dashboard enable more intuitive understanding of status and improve management efficiency.", whatWeOfferBlocks: [
            { title: "Emergency mustering", description: "During emergencies such as a fire, the sensor automatically triggers the opening of escape routes and emergency exits. Broadcasts, SMS reminders, and other measures accompany the process of gathering personnel in a safe place.", bullets: ["Auto trigger of escape routes", "Broadcasts and SMS reminders", "Gather personnel in safe place"], imageUrl: "images/solution-detail/s4-o0.jpg" },
            { title: "Centralized management", description: "The video wall facilitates the viewing of video feeds at multiple points. Synergates's platform also includes a visual data dashboard, enabling more intuitive understanding of the status and improving your entire management efficiency.", bullets: ["Video wall at multiple points", "Visual data dashboard", "Improve management efficiency"], imageUrl: "images/solution-detail/s4-o1.jpg" }
        ]}
    ],
    'transmission-line-inspection': [
        { whatWeOfferIntro: "Synergates offers a reliable video-based system for 24/7 monitoring of electrical operations. Real-time detection and alarms enable quick response and optimal performance. Radar-based solution and solar-powered video solution support harsh and remote environments.", whatWeOfferBlocks: [
            { title: "Radar-based solution", description: "Synergates's radar integrated with video cameras detects potential intrusions by personnel, vehicles and machinery. Prevent damages to power equipment; reduce false alarms caused by trees; send alarms to the command center for timely safety measures.", bullets: ["Detect intrusions by personnel, vehicles, machinery", "Reduce false alarms caused by trees", "Send alarms to command center"], imageUrl: "images/solution-detail/s0-o0.jpg" },
            { title: "Solar-powered video solution", description: "Solar-powered cameras are perfect for remote, long-range pipelines. Provide continuous, high-resolution monitoring; operate without power supply constraints; detect and report intrusions, equipment issues, smoke, or fire.", bullets: ["Continuous high-resolution monitoring", "No power supply constraints", "Detect intrusions, equipment issues, smoke, or fire"], imageUrl: "images/solution-detail/s0-o1.jpg" }
        ]},
        { whatWeOfferIntro: "The video security system performs routine inspections by automatically capturing high-definition images of transmission components. This allows managers to stay informed about on-site situations, even from a remote office.", whatWeOfferBlocks: [
            { title: "Remote image inspection", description: "Synergates's platform captures images of tower components based on a predefined checklist, enabling inspectors to quickly assess equipment status online.", bullets: ["Images based on predefined checklist", "Assess equipment status online", "Quick inspection from remote office"], imageUrl: "images/solution-detail/s1-o0.jpg" },
            { title: "Thermal temperature inspection", description: "Thermal cameras detect temperature changes due to poor connections or overloads. They automatically check specified points and provide optical images to help assess the condition of electrical equipment.", bullets: ["Detect temperature changes", "Check specified points automatically", "Assess condition of electrical equipment"], imageUrl: "images/solution-detail/s1-o1.jpg" }
        ]},
        { whatWeOfferIntro: "Synergates's digital products enhance field operations, ensuring they are standardized and safe through visualized verification. Real-time recording of operational processes and streamlined operation supervision support safety procedures and training.", whatWeOfferBlocks: [
            { title: "Real-time recording of operational processes", description: "Portable cameras record operations from the worker's or third-person view. The monitoring center can verify safety procedures and offer assistance via two-way intercom.", bullets: ["Record from worker's or third-person view", "Verify safety procedures", "Two-way intercom assistance"], imageUrl: "images/solution-detail/s2-o0.jpg" },
            { title: "Streamlined operation supervision", description: "The Synergates Central Platform efficiently allocates devices and manages planning. It backs up work documents and video evidence, which can be used for training purposes.", bullets: ["Efficient device allocation and planning", "Back up work documents and video evidence", "Use for training purposes"], imageUrl: "images/solution-detail/s2-o1.jpg" }
        ]},
        { whatWeOfferIntro: "Synergates provides a comprehensive platform for data visualization and analysis, enhancing incident handling and maintenance efficiency. Visualized dashboard and multi-dimensional reports assist device maintenance and personnel planning.", whatWeOfferBlocks: [
            { title: "Visualized dashboard", description: "Provides crystal clear insights using visualized data. Promptly respond to emergencies and alarms; monitor from an all-inclusive dashboard with intuitive data; get real-time status of ongoing site operations.", bullets: ["Respond to emergencies and alarms", "All-inclusive dashboard with intuitive data", "Real-time status of ongoing operations"], imageUrl: "images/solution-detail/s3-o0.jpg" },
            { title: "Multi-dimensional reports", description: "The platform also offers diverse reports to assist device maintenance. Aid in personnel planning and device operation scheduling; allow O&M teams to view real-time operational status and historical data monthly or weekly.", bullets: ["Reports for device maintenance", "Personnel planning and scheduling", "Real-time status and historical data"], imageUrl: "images/solution-detail/s3-o1.jpg" }
        ]}
    ],
    'solar-farms': [
        { whatWeOfferIntro: "In solar farms where there is limited supervision, Synergates's thermal and AI-based technologies help make perimeter protection and vehicle management much easier. Perimeter protection and vehicle management solutions secure the site and streamline access.", whatWeOfferBlocks: [
            { title: "Perimeter protection", description: "Synergates's high-quality products expertly detect and protect against security threats. Thermal cameras ensure 24/7 real-time monitoring even in harsh weather and low light; radar and PTZ linkages capture multi-angle footage; solar-powered cameras offer cost-effective perimeter security without extra wiring.", bullets: ["Thermal cameras for 24/7 monitoring", "Radar and PTZ linkages", "Solar-powered cameras without extra wiring"], imageUrl: "images/solution-detail/s0-o0.jpg" },
            { title: "Vehicle management", description: "Synergates provides efficient entrance and exit control for vehicles in solar farms. AI-powered cameras identify vehicles even in low-light conditions, offering detailed attribute data to help administrators verify entry.", bullets: ["Efficient entrance and exit control", "AI-powered vehicle identification", "Detailed attribute data for verification"], imageUrl: "images/solution-detail/s0-o1.jpg" }
        ]},
        { whatWeOfferIntro: "Synergates's solar farm solution boosts health and safety for personnel with continuous monitoring of critical areas using AI-powered analytics. The solution can further identify, manage, and prevent potential risks.", whatWeOfferBlocks: [
            { title: "Access control management", description: "The employee authentication system enhances personnel safety by ensuring strict control and authorized access in critical areas. Visitors can conveniently check-in and -out by preregistering on Synergates Central platform.", bullets: ["Strict control and authorized access", "Visitor check-in and -out on Synergates Central", "Enhance personnel safety"], imageUrl: "images/solution-detail/s1-o0.jpg" },
            { title: "Personnel safety compliance", description: "Synergates's AI-based devices verify the presence of personal protective equipment, preventing safety hazards while achieving legal safety compliance. Body-worn and helmet cameras support recording and evidence.", bullets: ["Verify PPE presence", "Prevent safety hazards", "Legal safety compliance"], imageUrl: "images/solution-detail/s1-o1.jpg" }
        ]},
        { whatWeOfferIntro: "By remote monitoring with early detection of equipment issues, Synergates's solution streamlines and digitizes the inspection process, minimizing operational downtime and maximizing efficiency.", whatWeOfferBlocks: [
            { title: "Standardized inspection process", description: "Synergates simplifies the inspection process by bringing planning, execution and reporting online. With Synergates Central software, every step is traceable. Detailed processes and results for each item are presented with statistics and charts.", bullets: ["Planning, execution, reporting online", "Every step traceable", "Statistics and charts"], imageUrl: "images/solution-detail/s2-o0.jpg" },
            { title: "Diversified product mix options", description: "Synergates offers a range of product mix options for remote and on-site inspections: remote inspection with thermal products and video imaging, on-site inspection with portable devices, body-worn and helmet cameras, and two-way intercom.", bullets: ["Remote inspection with thermal and video", "On-site inspection with portable devices", "Body-worn and helmet cameras"], imageUrl: "images/solution-detail/s2-o1.jpg" }
        ]},
        { whatWeOfferIntro: "Synergates Central platform and video wall system offers centralized management solution for solar farms. With visualized data collection and analysis, operators gain insights into operational performance and address security risks quickly.", whatWeOfferBlocks: [
            { title: "Centralized dashboard", description: "Provides crystal clear insights using visualized data. Get real-time inspection status of ongoing field operations; monitor from an all-inclusive dashboard with perceived data; equip operational teams with a bird's eye view and multidimensional analytics.", bullets: ["Real-time inspection status", "All-inclusive dashboard", "Bird's eye view and multidimensional analytics"], imageUrl: "images/solution-detail/s3-o0.jpg" }
        ]}
    ]
};

function imgFor(title, scenario) {
    const base = scenario ? 'images/solution-detail/' + scenario + '/' : 'images/solution-detail/shared/';
    const t = (title || '').toLowerCase();
    if (t.includes('parking')) return base + IMG.parking;
    if (t.includes('lobby')) return base + IMG.lobby;
    if (t.includes('reception')) return base + IMG.reception;
    if (t.includes('indoor') || t.includes('public')) return base + IMG.indoor;
    if (t.includes('meeting')) return base + IMG.meeting;
    if (t.includes('inventory') || t.includes('warehouse')) return base + IMG.warehouse;
    if (t.includes('perimeter')) return base + IMG.perimeter;
    if (t.includes('control')) return base + IMG.control;
    if (t.includes('intersection')) return base + IMG.intersection;
    if (t.includes('traffic') || t.includes('lane')) return base + IMG.traffic;
    if (t.includes('bus lane') || t.includes('bus stop')) return base + IMG.bus;
    if (t.includes('classroom') || t.includes('in-class')) return base + IMG.classroom;
    if (t.includes('entrance') && t.includes('store')) return base + IMG.store;
    if (t.includes('highway')) return base + IMG.highway;
    if (t.includes('tunnel')) return base + IMG.tunnel;
    if (t.includes('solar')) return base + IMG.array;
    if (t.includes('pipeline')) return base + IMG.pipeline;
    if (t.includes('dam') || t.includes('reservoir')) return base + IMG.dam;
    if (t.includes('turbine')) return base + IMG.turbine;
    if (t.includes('oilfield') || t.includes('well site')) return base + IMG.oilfield;
    if (t.includes('offshore') || t.includes('platform')) return base + IMG.offshore;
    if (t.includes('transmission') || t.includes('line inspection')) return base + IMG.transmission;
    if (t.includes('cashier')) return base + IMG.cashier;
    if (t.includes('command')) return base + IMG.command;
    if (t.includes('roadside') || t.includes('urban roadside')) return base + IMG.roadside;
    if (t.includes('showroom')) return base + IMG.showroom;
    if (t.includes('conference') || t.includes('conferencing')) return base + IMG.conference;
    if (t.includes('substation') || t.includes('equipment area')) return base + IMG.substation;
    if (t.includes('shopping') || t.includes('mall')) return base + IMG.mall;
    if (t.includes('passenger')) return base + IMG.passenger;
    if (t.includes('driving cabin')) return base + IMG.driving;
    if (t.includes('entryway') || t.includes('entry')) return base + IMG.entryway;
    if (t.includes('operation center')) return base + IMG.operation;
    if (t.includes('anomaly')) return base + IMG.anomaly;
    if (t.includes('flow') || t.includes('counting')) return base + IMG.flow;
    if (t.includes('voice') || t.includes('broadcast')) return base + IMG.voice;
    if (t.includes('guidance')) return base + IMG.guidance;
    if (t.includes('analytics')) return base + IMG.analytics;
    if (t.includes('advertising') || t.includes('display')) return base + IMG.advertising;
    if (t.includes('general security')) return base + IMG.security;
    if (t.includes('ramp')) return base + IMG.ramp;
    if (t.includes('shoulder')) return base + IMG.shoulder;
    if (t.includes('toll')) return base + IMG.toll;
    if (t.includes('gore')) return base + IMG.gore;
    if (t.includes('yellow box')) return base + IMG.yellow;
    if (t.includes('remote learning')) return base + IMG.remote;
    if (t.includes('central management')) return base + IMG.central;
    if (t.includes('multi-classroom')) return base + IMG.multi;
    if (t.includes('dock')) return base + IMG.dock;
    if (t.includes('parcel')) return base + IMG.parcel;
    if (t.includes('array area')) return base + IMG.array;
    if (t.includes('inverter')) return base + IMG.inverter;
    if (t.includes('switchyard')) return base + IMG.switchyard;
    if (t.includes('valve')) return base + IMG.valve;
    if (t.includes('crossing')) return base + IMG.crossing;
    if (t.includes('line inspection') || t.includes('tower')) return base + IMG.line;
    if (t.includes('corridor')) return base + IMG.corridor;
    return base + IMG.default;
}

/** Add ?v=IMAGE_VERSION to image URLs for cache busting (admin-replaced images show immediately). */
function addImageVersion(url) {
    if (!url || typeof url !== 'string') return url;
    if (url.indexOf('images/') === -1) return url;
    if (url.indexOf('v=') !== -1) return url;
    var v = (typeof window.IMAGE_VERSION !== 'undefined') ? String(window.IMAGE_VERSION) : String(Date.now());
    return url + (url.indexOf('?') >= 0 ? '&' : '?') + 'v=' + v;
}

function renderSectionContent(section, scenario) {
    const t = (window.i18n && window.i18n.t) ? function(k){ return window.i18n.t(k); } : function(k){ return k; };
    const challengesLabel = t('solutionDetail.challenges');
    const whatWeOfferLabel = t('solutionDetail.whatWeOffer');

    const img1 = addImageVersion(section.challengeImg1Url || imgFor(section.challengeImg1 || section.title, scenario));
    const img2 = addImageVersion(section.challengeImg2Url || imgFor(section.challengeImg2 || section.title, scenario));
    const cap1 = (section.challengeImg1 || '').replace(/"/g, '&quot;');
    const cap2 = (section.challengeImg2 || '').replace(/"/g, '&quot;');

    var whatWeOfferHtml = '';
    var blocks = section.whatWeOfferBlocks;
    function buildOfferBlock(block, idx, img1Fallback, img2Fallback) {
        var imageLeft = idx % 2 === 0;
        var rawUrl = block.imageUrl || (idx === 0 ? img1Fallback : img2Fallback) || imgFor(block.title || section.title, scenario);
        var imgUrl = addImageVersion(rawUrl);
        var bullets = (block.bullets || []).map(function(b) { return '<li>' + b + '</li>'; }).join('');
        var blockClass = 'what-we-offer-block' + (imageLeft ? '' : ' what-we-offer-block--image-right');
        var content = '<div class="what-we-offer-block-content">' +
            '<h4 class="what-we-offer-block-title">' + (block.title || '') + '</h4>' +
            (block.description ? '<p class="what-we-offer-block-desc">' + block.description + '</p>' : '') +
            (bullets ? '<ul class="what-we-offer-block-list">' + bullets + '</ul>' : '') + '</div>';
        var imgBlock = '<div class="what-we-offer-block-image"><img src="' + imgUrl + '" alt="' + (block.title || '').replace(/"/g, '&quot;') + '" loading="lazy"/></div>';
        return '<div class="' + blockClass + '">' + (imageLeft ? imgBlock + content : content + imgBlock) + '</div>';
    }
    if (blocks && blocks.length > 0) {
        var intro = (section.whatWeOfferIntro != null && section.whatWeOfferIntro !== '') ? section.whatWeOfferIntro : section.whatWeOffer;
        whatWeOfferHtml = '<div class="what-we-offer-section">' +
            '<h3 class="what-we-offer-title">' + whatWeOfferLabel + '</h3>' +
            (intro ? '<p class="what-we-offer-intro">' + intro + '</p>' : '') +
            blocks.map(function(block, idx) { return buildOfferBlock(block, idx, img1, img2); }).join('') +
            '</div>';
    } else {
        var fallbackBlocks = [];
        if (section.benefits && section.benefits.length >= 2 && section.whatWeOffer) {
            fallbackBlocks = [
                { title: section.benefits[0].title, description: section.whatWeOffer, bullets: section.benefits[0].items || [], imageUrl: img1 },
                { title: section.benefits[1].title, description: '', bullets: section.benefits[1].items || [], imageUrl: img2 }
            ];
        }
        if (fallbackBlocks.length >= 2) {
            whatWeOfferHtml = '<div class="what-we-offer-section">' +
                '<h3 class="what-we-offer-title">' + whatWeOfferLabel + '</h3>' +
                (section.whatWeOffer ? '<p class="what-we-offer-intro">' + section.whatWeOffer + '</p>' : '') +
                fallbackBlocks.map(function(block, idx) { return buildOfferBlock(block, idx, img1, img2); }).join('') +
                '</div>';
        } else {
            whatWeOfferHtml = '<div class="pt-8 border-t border-gray-200"><h3 class="text-lg font-semibold text-gray-900 mb-3">' + whatWeOfferLabel + '</h3><p class="text-gray-600 text-base md:text-lg leading-relaxed">' + (section.whatWeOffer || '') + '</p></div>';
        }
    }

    return '<article class="scenario-section-article text-gray-900">' +
        '<h2 class="text-2xl md:text-3xl font-bold mb-8 pb-4 border-b border-gray-200">' + section.title + '</h2>' +
        '<h3 class="text-lg font-semibold text-gray-900 mb-3">' + challengesLabel + '</h3>' +
        '<p class="text-gray-600 text-base md:text-lg leading-relaxed mb-8">' + (section.challenges || '') + '</p>' +
        '<div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-10">' +
            '<div class="rounded-xl overflow-hidden shadow-md border border-gray-100"><img src="' + img1 + '" alt="' + cap1 + '" class="w-full h-48 md:h-56 object-cover" loading="lazy"/><p class="p-3 text-center text-sm font-medium text-gray-700 bg-white">' + (cap1 || '—') + '</p></div>' +
            '<div class="rounded-xl overflow-hidden shadow-md border border-gray-100"><img src="' + img2 + '" alt="' + cap2 + '" class="w-full h-48 md:h-56 object-cover" loading="lazy"/><p class="p-3 text-center text-sm font-medium text-gray-700 bg-white">' + (cap2 || '—') + '</p></div>' +
        '</div>' +
        '<div class="pt-8 border-t border-gray-200">' + whatWeOfferHtml + '</div>' +
    '</article>';
}
