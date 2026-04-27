<?php
/**
 * Image slots - every place on the website where an image can be managed via admin.
 * Solutions page (solutions.html) images are NOT included - admin does not manage those.
 */
$baseDir = dirname(__DIR__);
$projectSlots = [];
if (file_exists($baseDir . '/config/projects-parser.php')) {
    require_once $baseDir . '/config/projects-parser.php';
    $parsedProjects = parse_projects_from_clientdata($baseDir);
    foreach ($parsedProjects as $i => $p) {
        $label = $p['client'] . (isset($p['date']) && $p['date'] ? ' – ' . $p['date'] : (isset($p['status']) && $p['status'] ? ' – ' . $p['status'] : ''));
        $projectSlots[] = ['id' => 'project-' . $i, 'label' => $label, 'location' => 'Projects grid, card ' . ($i + 1), 'path' => 'images/projects/' . $i . '.jpg', 'page' => 'projects.html'];
    }
}
$scenarioSectionCounts = [
    'classroom-hub' => 4, 'urban-roadways' => 7, 'stores' => 6, 'bus-stop' => 5,
    'car-dealerships' => 6, 'conference-rooms' => 2, 'electrical-substations' => 3,
    'factories' => 6, 'offices' => 8, 'construction-site' => 6, 'gas-stations' => 7,
    'hotels' => 8, 'schools' => 6, 'warehouses' => 4,
    'highways' => 6, 'monitoring-center' => 3, 'parking-lots' => 4,
    'shopping-malls' => 4, 'transit-bus-onboard' => 4, 'onshore-oilfields' => 5,
    'supermarkets' => 6, 'offshore-oil-platform' => 3, 'transmission-line-inspection' => 4,
    'pipeline-inspection' => 4, 'solar-farms' => 4, 'hydroelectric-power-plants' => 5,
];
$scenarioLabels = [
    'classroom-hub' => 'Classroom Hub', 'urban-roadways' => 'Urban Roadways', 'stores' => 'Stores',
    'bus-stop' => 'Bus Stop', 'car-dealerships' => 'Car Dealerships', 'conference-rooms' => 'Conference Rooms',
    'electrical-substations' => 'Electrical Substations', 'factories' => 'Factories', 'offices' => 'Offices',
    'construction-site' => 'Construction Site', 'gas-stations' => 'Gas Stations', 'hotels' => 'Hotels',
    'schools' => 'Schools', 'warehouses' => 'Warehouses', 'highways' => 'Highways',
    'monitoring-center' => 'Monitoring Center', 'parking-lots' => 'Parking Lots',
    'shopping-malls' => 'Shopping Malls', 'transit-bus-onboard' => 'Transit Bus On-board',
    'onshore-oilfields' => 'Onshore Oilfields', 'supermarkets' => 'Supermarkets',
    'offshore-oil-platform' => 'Offshore Oil Platform', 'transmission-line-inspection' => 'Transmission Line Inspection',
    'pipeline-inspection' => 'Pipeline Inspection', 'solar-farms' => 'Solar Farms',
    'hydroelectric-power-plants' => 'Hydroelectric Power Plants',
];
$whatWeOfferBlockCounts = [
    'electrical-substations' => [3, 3, 3], 'monitoring-center' => [2, 1, 1],
    'classroom-hub' => [2, 2, 2, 2], 'parking-lots' => [2, 2, 2, 2],
    'urban-roadways' => [2, 2, 2, 2, 2, 2, 2], 'stores' => [2, 2, 2, 2, 2, 2],
    'onshore-oilfields' => [3, 2, 2, 2, 2], 'transmission-line-inspection' => [2, 2, 2, 2],
    'solar-farms' => [2, 2, 2, 1],
    'bus-stop' => [2, 2, 2, 2, 2], 'car-dealerships' => [2, 2, 2, 2, 2, 2],
    'conference-rooms' => [2, 2], 'highways' => [2, 2, 2, 2, 2, 2],
    'shopping-malls' => [2, 2, 2, 2], 'transit-bus-onboard' => [2, 2, 2, 2],
    'supermarkets' => [2, 2, 2, 2, 2, 2], 'offshore-oil-platform' => [2, 2, 2],
    'pipeline-inspection' => [2, 2, 2, 2], 'hydroelectric-power-plants' => [2, 2, 2, 2, 2],
    'factories' => [2, 2, 2, 2, 2, 2], 'offices' => [2, 2, 2, 2, 2, 2, 2, 2],
    'construction-site' => [2, 2, 2, 2, 2, 2], 'gas-stations' => [2, 2, 2, 2, 2, 2, 2],
    'hotels' => [2, 2, 2, 2, 2, 2, 2, 2], 'schools' => [2, 2, 2, 2, 2, 2], 'warehouses' => [2, 2, 2, 2],
];

$solutionDetailSlots = [];
foreach ($scenarioSectionCounts as $scenario => $sections) {
    $label = $scenarioLabels[$scenario] ?? $scenario;
    $slots = [];
    for ($i = 0; $i < $sections; $i++) {
        $slots[] = ['id' => $scenario . '-s' . $i . '-ch1', 'label' => $label . ' – Section ' . ($i + 1) . ' challenge 1', 'location' => 'Challenges, section ' . ($i + 1) . ', left image', 'path' => "images/solution-detail/$scenario/s{$i}-ch1.jpg", 'page' => "solution-detail.html?scenario=$scenario"];
        $slots[] = ['id' => $scenario . '-s' . $i . '-ch2', 'label' => $label . ' – Section ' . ($i + 1) . ' challenge 2', 'location' => 'Challenges, section ' . ($i + 1) . ', right image', 'path' => "images/solution-detail/$scenario/s{$i}-ch2.jpg", 'page' => "solution-detail.html?scenario=$scenario"];
    }
    if (isset($whatWeOfferBlockCounts[$scenario])) {
        foreach ($whatWeOfferBlockCounts[$scenario] as $secIdx => $blockCount) {
            for ($o = 0; $o < $blockCount; $o++) {
                $slots[] = ['id' => $scenario . '-s' . $secIdx . '-o' . $o, 'label' => $label . ' – Section ' . ($secIdx + 1) . ' offer ' . ($o + 1), 'location' => 'What we offer, section ' . ($secIdx + 1) . ', block ' . ($o + 1), 'path' => "images/solution-detail/$scenario/s{$secIdx}-o{$o}.jpg", 'page' => "solution-detail.html?scenario=$scenario"];
            }
        }
    }
    $solutionDetailSlots[] = ['group' => 'Solution Detail – ' . $label, 'slots' => $slots];
}

return array_merge([
    [
        'group' => 'Homepage',
        'slots' => [
            ['id' => 'home-company', 'label' => 'Company intro image', 'location' => 'Main hero section', 'path' => 'images/about/our-company.jpg', 'page' => 'index.html'],
        ],
    ],
    [
        'group' => 'About',
        'slots' => [
            ['id' => 'about-office', 'label' => 'Office building photo', 'location' => 'About page main image', 'path' => 'images/about/office-building.jpg', 'page' => 'about.html'],
        ],
    ],
    [
        'group' => 'Projects',
        'slots' => $projectSlots ?: [
            ['id' => 'project-0', 'label' => 'Project placeholder', 'location' => 'Projects grid', 'path' => 'images/projects/0.jpg', 'page' => 'projects.html'],
        ],
    ],
    [
        'group' => 'Solution Detail – Apartments',
        'slots' => [
            ['id' => 'apt-photo1', 'label' => 'Apartments – Vehicle entrance (left)', 'location' => 'Diagram button 1, left image', 'path' => 'images/solution-detail/apartments/photo1.jpg', 'page' => 'solution-detail.html?scenario=apartments'],
            ['id' => 'apt-photo2', 'label' => 'Apartments – Vehicle entrance (right)', 'location' => 'Diagram button 1, right image', 'path' => 'images/solution-detail/apartments/photo2.jpg', 'page' => 'solution-detail.html?scenario=apartments'],
            ['id' => 'apt-photo3', 'label' => 'Apartments – Lobby (left)', 'location' => 'Diagram button 2, left image', 'path' => 'images/solution-detail/apartments/photo3.jpg', 'page' => 'solution-detail.html?scenario=apartments'],
            ['id' => 'apt-photo4', 'label' => 'Apartments – Public Indoor (left)', 'location' => 'Diagram button 3, left image', 'path' => 'images/solution-detail/apartments/photo4.jpg', 'page' => 'solution-detail.html?scenario=apartments'],
            ['id' => 'apt-photo5', 'label' => 'Apartments – Public Indoor (right)', 'location' => 'Diagram button 3, right image', 'path' => 'images/solution-detail/apartments/photo5.jpg', 'page' => 'solution-detail.html?scenario=apartments'],
            ['id' => 'apt-photo6', 'label' => 'Apartments – Perimeter (left)', 'location' => 'Diagram button 4, left image', 'path' => 'images/solution-detail/apartments/photo6.jpg', 'page' => 'solution-detail.html?scenario=apartments'],
            ['id' => 'apt-photo7', 'label' => 'Apartments – Perimeter (right)', 'location' => 'Diagram button 4, right image', 'path' => 'images/solution-detail/apartments/photo7.jpg', 'page' => 'solution-detail.html?scenario=apartments'],
            ['id' => 'apt-photo8', 'label' => 'Apartments – Control Room (left)', 'location' => 'Diagram button 5, left image', 'path' => 'images/solution-detail/apartments/photo8.jpg', 'page' => 'solution-detail.html?scenario=apartments'],
            ['id' => 'apt-photo9', 'label' => 'Apartments – Control Room (right)', 'location' => 'Diagram button 5, right image', 'path' => 'images/solution-detail/apartments/photo9.jpg', 'page' => 'solution-detail.html?scenario=apartments'],
        ],
    ],
], $solutionDetailSlots);
