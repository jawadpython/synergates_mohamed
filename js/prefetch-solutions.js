/**
 * Prefetch solution grid images when user visits other pages.
 * Runs when idle so it won't slow down the current page.
 * When user later opens solutions.html, images load from cache.
 */
(function() {
    var SOLUTIONS_IMAGES = [
        'images/solutions_frontimage/buldingimage.webp',
        'images/solutions_frontimage/Factories.png',
        'images/solutions_frontimage/Classroom%20hub.png',
        'images/solutions_frontimage/Urban%20roadways.png',
        'images/solutions_frontimage/Office%20Buildings.png',
        'images/solutions_frontimage/Supermarkets.png',
        'images/solutions_frontimage/Bus%20Stop.png',
        'images/solutions_frontimage/Car%20Dealerships.png',
        'images/solutions_frontimage/Conference%20Rooms.png',
        'images/solutions_frontimage/Construction%20Site.png',
        'images/solutions_frontimage/Electrical%20Substations.png',
        'images/solutions_frontimage/Gas%20Stations.png',
        'images/solutions_frontimage/Highways.png',
        'images/solutions_frontimage/Hotels.png',
        'images/solutions_frontimage/Monitoring%20Center.png',
        'images/solutions_frontimage/Parking%20Lots.png',
        'images/solutions_frontimage/Schools.png',
        'images/solutions_frontimage/Shopping%20Malls.png',
        'images/solutions_frontimage/Transit%20Bus%20On-board.png',
        'images/solutions_frontimage/Warehouses.png',
        'images/solutions_frontimage/Onshore%20Oilfields.png',
        'images/solutions_frontimage/Transmission%20Line%20Inspection.png',
        'images/solutions_frontimage/Pipeline%20Inspection.png',
        'images/solutions_frontimage/Solar%20Farms.png',
        'images/solutions_frontimage/Hydroelectric%20Power%20Plants.png'
    ];

    function run() {
        var path = window.location.pathname || '';
        if (path.indexOf('solutions.html') >= 0 || path.endsWith('solutions')) return;

        var head = document.head;
        SOLUTIONS_IMAGES.forEach(function(href) {
            var link = document.createElement('link');
            link.rel = 'prefetch';
            link.as = 'image';
            link.href = href;
            if (head) head.appendChild(link);
        });
    }

    function schedule() {
        if (typeof requestIdleCallback !== 'undefined') {
            requestIdleCallback(run, { timeout: 8000 });
        } else {
            setTimeout(run, 4000);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', schedule);
    } else {
        schedule();
    }
})();
