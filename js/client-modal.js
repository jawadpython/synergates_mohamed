/**
 * Client Modal - Connects logo carousel to clients-data.txt
 * Parses data, shows popup on logo click. Reusable: new clients in data file work automatically.
 */
(function () {
    'use strict';

    var clientsMap = {};
    var modalEl = null;

    /** Map logo alt text to data client name (for matching) */
    var ALT_TO_CLIENT = {
        'Afriquia Gaz': 'Afriquia Gaz',
        'Salam Gaz': 'Salam Gaz',
        'Prison Khémisset': 'Prison Local Khémisset',
        'Tarec': 'Tarec',
        'STORY RABAT': 'STORY RABAT',
        'Maghreb Oxygene': null,
        'Stogaz': null,
        'Somas': 'Somas',
        'Afriquia SMDC': 'Afriquia SMDC',
        'Big IT Services': null,
        'Cabinet Dr Hanane Benkhedra': 'Cabinet Dr Hanane Benkhedra',
        'Intelligence Mental Robotique': 'Intelligence Mental Robotique',
        'FER 7': null,
        'SRM-SM': null,
        'Ifriacold': null,
        'Hilton Tangier City Center': null
    };

    /**
     * Parse clientdata.txt - format: CLIENT: Name, Project Date/Status, Locations, Services Provided, ---
     */
    function parseClientsData(text) {
        text = (text || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        var blocks = text.split(/\n---\n/);
        var merged = {};

        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i].trim();
            if (!block || block.indexOf('CLIENT:') === -1) continue;

            var lines = block.split('\n');
            var name = '';
            var dates = [];
            var locations = [];
            var services = [];
            var equipment = [];
            var section = '';

            for (var j = 0; j < lines.length; j++) {
                var line = lines[j];
                var m = line.match(/^CLIENT:\s*(.+)$/);
                if (m) {
                    name = m[1].trim();
                    section = 'client';
                    continue;
                }
                m = line.match(/^Project\s+Date(s?):\s*(.+)$/i);
                if (m) {
                    dates.push(m[2].trim());
                    continue;
                }
                m = line.match(/^Project\s+Status:\s*(.+)$/i);
                if (m) {
                    dates.push(m[1].trim());
                    continue;
                }
                if (line.match(/^Location(s?):\s*$/i)) {
                    section = 'locations';
                    continue;
                }
                if (line.match(/^Services\s+Provided:\s*$/i)) {
                    section = 'services';
                    continue;
                }
                if (line.match(/^Equipment\s+Used:\s*$/i)) {
                    section = 'equipment';
                    continue;
                }
                m = line.match(/^\*\s+(.+)$/);
                if (m) {
                    var item = m[1].trim();
                    if (section === 'locations') locations.push(item);
                    else if (section === 'services') services.push(item);
                    else if (section === 'equipment') equipment.push(item);
                    continue;
                }
            }

            if (!name) continue;

            if (!merged[name]) {
                merged[name] = { name: name, services: [], locations: [], dates: [], equipment: [], rawText: [] };
            }
            merged[name].services = merged[name].services.concat(services);
            merged[name].locations = merged[name].locations.concat(locations);
            merged[name].dates = merged[name].dates.concat(dates);
            merged[name].equipment = merged[name].equipment.concat(equipment);
            merged[name].rawText.push(block);
        }

        var result = {};
        for (var k in merged) {
            var o = merged[k];
            var locSet = {};
            o.locations.forEach(function (loc) { locSet[loc] = 1; });
            var svcSet = {};
            o.services.forEach(function (s) { svcSet[s] = 1; });
            var eqSet = {};
            o.equipment.forEach(function (e) { eqSet[e] = 1; });
            result[k] = {
                name: o.name,
                services: Object.keys(svcSet),
                locations: Object.keys(locSet),
                dates: o.dates.length ? o.dates.join(' – ') : '',
                equipment: Object.keys(eqSet),
                rawText: o.rawText.join('\n\n')
            };
        }
        return result;
    }

    function t(key) {
        if (window.i18n && typeof window.i18n.t === 'function') return window.i18n.t(key);
        var fallback = {
            'clientModal.services': 'Services réalisés',
            'clientModal.locations': 'Lieux',
            'clientModal.projectDates': 'Période du projet',
            'clientModal.projectInfo': 'Informations du projet',
            'clientModal.client': 'Client',
            'clientModal.projectDate': 'Date du projet',
            'clientModal.servicesProvided': 'Services fournis',
            'clientModal.viewProjects': 'Voir les projets',
            'clientModal.noDetails': 'Aucun détail de projet disponible.',
            'clientModal.close': 'Fermer'
        };
        return fallback[key] || key;
    }

    function escapeHtml(s) {
        var d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
    }

    function formatRawText(raw) {
        if (!raw) return '';
        var lines = raw.split('\n');
        var html = '';
        var inList = false;
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            var trimmed = line.trim();
            if (!trimmed) {
                if (inList) { html += '</ul>'; inList = false; }
                html += '<br>';
                continue;
            }
            if (trimmed.match(/^CLIENT:|^Project\s+(Date|Status)|^Location(s?):$|^Services\s+Provided:$|^Equipment\s+Used:$/i)) {
                if (inList) { html += '</ul>'; inList = false; }
                html += '<p class="client-modal-label">' + escapeHtml(trimmed) + '</p>';
            } else if (trimmed.match(/^[\*❖•]\s*/) || trimmed.match(/^\s*❖/)) {
                if (!inList) { html += '<ul class="client-modal-list">'; inList = true; }
                html += '<li>' + escapeHtml(trimmed.replace(/^[\*❖•]\s*/, '').trim()) + '</li>';
            } else {
                if (inList) { html += '</ul>'; inList = false; }
                html += '<p class="client-modal-value">' + escapeHtml(trimmed) + '</p>';
            }
        }
        if (inList) html += '</ul>';
        return html;
    }

    function getModalHtml(client, logoImgSrc, displayTitle) {
        var tname = (displayTitle && String(displayTitle).trim()) || client.name;
        var infoHtml = '<div class="client-modal-section">' +
            '<h3 class="client-modal-section-title">' + escapeHtml(t('clientModal.projectInfo')) + '</h3>' +
            '<div class="client-modal-info-grid">' +
            '<div class="client-modal-info-row"><span class="client-modal-info-label">' + escapeHtml(t('clientModal.client')) + '</span><span class="client-modal-info-value">' + escapeHtml(tname) + '</span></div>' +
            (client.dates ? '<div class="client-modal-info-row"><span class="client-modal-info-label">' + escapeHtml(t('clientModal.projectDate')) + '</span><span class="client-modal-info-value">' + escapeHtml(client.dates) + '</span></div>' : '') +
            '</div></div>';

        var locationsHtml = client.locations.length
            ? '<div class="client-modal-section"><h3 class="client-modal-section-title">' + escapeHtml(t('clientModal.locations')) + '</h3>' +
              '<div class="client-modal-tags">' + client.locations.map(function (loc) { return '<span class="client-modal-tag">' + escapeHtml(loc) + '</span>'; }).join('') + '</div></div>'
            : '';

        var servicesHtml = client.services.length
            ? '<div class="client-modal-section"><h3 class="client-modal-section-title">' + escapeHtml(t('clientModal.servicesProvided')) + '</h3>' +
              '<div class="client-modal-pills">' + client.services.map(function (s) { return '<span class="client-modal-pill">' + escapeHtml(s) + '</span>'; }).join('') + '</div></div>'
            : '';

        return '<div id="client-modal-overlay" class="client-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="client-modal-title">' +
            '<div class="client-modal">' +
            '<div class="client-modal-header">' +
            '<div class="client-modal-header-inner">' +
            (logoImgSrc ? '<img src="' + escapeHtml(logoImgSrc) + '" alt="' + escapeHtml(tname) + '" class="client-modal-logo">' : '') +
            '<h2 id="client-modal-title" class="client-modal-title">' + escapeHtml(tname) + '</h2>' +
            '</div>' +
            '<button type="button" class="client-modal-close" aria-label="' + t('clientModal.close') + '">&times;</button>' +
            '</div>' +
            '<div class="client-modal-body">' + infoHtml + locationsHtml + servicesHtml + '</div>' +
            '<div class="client-modal-footer">' +
            '<a href="projects.html" class="client-modal-btn">' + t('clientModal.viewProjects') + '</a>' +
            '</div>' +
            '</div></div>';
    }

    function getNoDataHtml(clientName, logoImgSrc) {
        return '<div id="client-modal-overlay" class="client-modal-overlay" role="dialog" aria-modal="true">' +
            '<div class="client-modal">' +
            '<div class="client-modal-header">' +
            '<div class="client-modal-header-inner">' +
            (logoImgSrc ? '<img src="' + escapeHtml(logoImgSrc) + '" alt="' + escapeHtml(clientName) + '" class="client-modal-logo">' : '') +
            '<h2 class="client-modal-title">' + escapeHtml(clientName) + '</h2>' +
            '</div>' +
            '<button type="button" class="client-modal-close" aria-label="' + t('clientModal.close') + '">&times;</button>' +
            '</div>' +
            '<div class="client-modal-body">' +
            '<p class="client-modal-empty">' + t('clientModal.noDetails') + '</p>' +
            '</div>' +
            '<div class="client-modal-footer">' +
            '<a href="projects.html" class="client-modal-btn">' + t('clientModal.viewProjects') + '</a>' +
            '</div>' +
            '</div></div>';
    }

    function openModal(client, logoImgSrc, displayTitle) {
        closeModal();
        var title = (displayTitle && String(displayTitle).trim()) || (client && client.name) || '';
        var hasData = client && (client.rawText || client.services.length > 0 || client.locations.length > 0 || client.dates);
        var html = client ? (hasData ? getModalHtml(client, logoImgSrc, title) : getNoDataHtml(title, logoImgSrc)) : null;
        if (!html) return;
        document.body.insertAdjacentHTML('beforeend', html);
        modalEl = document.getElementById('client-modal-overlay');
        modalEl.style.display = 'flex';
        setTimeout(function () { modalEl.classList.add('client-modal-visible'); }, 10);
        document.body.style.overflow = 'hidden';
        bindModalEvents();
    }

    function closeModal() {
        var el = document.getElementById('client-modal-overlay');
        if (el) {
            el.classList.remove('client-modal-visible');
            setTimeout(function () {
                el.remove();
                document.body.style.overflow = '';
            }, 200);
        }
    }

    function bindModalEvents() {
        var overlay = document.getElementById('client-modal-overlay');
        if (!overlay) return;
        overlay.querySelector('.client-modal-close').addEventListener('click', closeModal);
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) closeModal();
        });
        document.addEventListener('keydown', onKeydown);
    }

    function onKeydown(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', onKeydown);
        }
    }

    function onLogoClick(e) {
        var item = e.target.closest('.logo-carousel-item');
        if (!item) return;
        var img = item.querySelector('img');
        if (!img) return;
        var alt = (img.getAttribute('alt') || '').trim();
        var dataName = ALT_TO_CLIENT.hasOwnProperty(alt) ? ALT_TO_CLIENT[alt] : alt;
        var logoSrc = img.getAttribute('src') || '';
        var base = window.__SITE_BASE__ || (window.location.origin + (window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1) || '/'));
        if (base.charAt(base.length - 1) !== '/') base += '/';
        var fullLogoSrc = logoSrc.indexOf('http') === 0 || logoSrc.indexOf('//') === 0 ? logoSrc : base + logoSrc;

        var client = dataName && clientsMap[dataName] ? clientsMap[dataName] : null;
        if (client) {
            openModal(client, fullLogoSrc, alt);
        } else {
            openModal({ name: alt, services: [], locations: [], dates: '' }, fullLogoSrc, alt);
        }
    }

    function init() {
        function setupCarousel() {
            var carousel = document.querySelector('.logo-carousel');
            if (carousel) {
                carousel.style.cursor = 'pointer';
                carousel.addEventListener('click', onLogoClick);
                carousel.querySelectorAll('.logo-carousel-item').forEach(function (el) {
                    el.style.cursor = 'pointer';
                });
            }
        }

        var text = (typeof window.__CLIENT_DATA_RAW__ === 'string') ? window.__CLIENT_DATA_RAW__ : '';
        if (text) {
            clientsMap = parseClientsData(text);
            setupCarousel();
            return;
        }

        var base = window.__SITE_BASE__ || (window.location.origin + (window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1) || '/'));
        if (base.charAt(base.length - 1) !== '/') base += '/';
        fetch(base + 'api/clientdata.php', { cache: 'no-store' })
            .then(function (r) { return r.ok ? r.text() : Promise.reject(); })
            .then(function (t) {
                clientsMap = parseClientsData(t);
                setupCarousel();
            })
            .catch(function () {
                fetch(base + 'clientdata.txt', { cache: 'no-store' })
                    .then(function (r) { return r.ok ? r.text() : Promise.reject(); })
                    .then(function (t) {
                        clientsMap = parseClientsData(t);
                        setupCarousel();
                    })
                    .catch(setupCarousel);
            });
    }

    document.addEventListener('languageChanged', function () { closeModal(); });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
