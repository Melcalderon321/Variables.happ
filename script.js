document.addEventListener('DOMContentLoaded', () => {
    // UI Containers
    const comparisonView = document.getElementById('comparison-view');
    const singleCartView = document.getElementById('single-cart-view');
    const cartSummaryGroup = document.getElementById('cart-summary-group');
    const infoBox = document.getElementById('info-box');
    const sectionHint = document.getElementById('section-hint');
    const emptyStateView = document.getElementById('empty-state-view');
    const infoView = document.getElementById('info-view');
    const inviteBanner = document.getElementById('invite-banner');
    const stickyBanner = document.createElement('div'); // Removed sticky banner
    const itemizedView = document.getElementById('itemized-card-view');
    const returnLink = document.getElementById('return-original-link');
    const mainFooter = document.getElementById('main-footer');
    const mainHeader = document.querySelector('.main-header');

    // UI Elements
    const cards = document.querySelectorAll('.card');
    const summaryTitle = document.getElementById('cart-summary-title');
    const trendIcon = document.getElementById('cart-trend-icon');
    const recommendedBadge = document.getElementById('cart-badge-recommended');
    const itemsList = document.getElementById('cart-items-list');
    const menuItems = document.querySelectorAll('.menu-item');
    const itemizedList = document.getElementById('itemized-items-list');
    const itemizedTotal = document.getElementById('itemized-total-price');
    const itemizedLabel = document.getElementById('itemized-total-label');
    const itemizedSubtext = document.getElementById('itemized-total-subtext');
    const itemizedMainTitle = document.getElementById('itemized-main-title');
    
    let currentCase = '8';
    let itemizedViewMode = 'original'; // 'original' or 'bio'

    // Helper for sequential animation
    function wrapRows(html) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const rows = tempDiv.querySelectorAll('.detail-row, .itemized-row');
        rows.forEach((row, i) => {
            row.style.setProperty('--i', i);
        });
        return tempDiv.innerHTML;
    }

    function navigateToCase(caseNum) {
        const url = new URL(window.location);
        url.searchParams.set('case', caseNum);
        url.searchParams.delete('mode'); // Clear mode when switching cases
        window.history.pushState({}, '', url);
        switchCase(caseNum);
    }

    function navigateToMode(mode) {
        const url = new URL(window.location);
        url.searchParams.set('mode', mode);
        window.history.pushState({}, '', url);
        // We don't call anything here because the transitions are handled by the buttons themselves
        // or we can centralize it. For now, we update the URL.
    }

    function switchCase(caseNum) {
        currentCase = caseNum;
        
        // Hide all views safely
        if(comparisonView) comparisonView.style.display = 'none';
        if(singleCartView) singleCartView.style.display = 'none';
        if(cartSummaryGroup) cartSummaryGroup.style.display = 'none';
        if(infoBox) infoBox.style.display = 'none';
        if(sectionHint) sectionHint.style.display = 'none';
        if(emptyStateView) emptyStateView.style.display = 'none';
        if(infoView) infoView.style.display = 'none';
        if(inviteBanner) inviteBanner.style.display = 'none';
        if(itemizedView) itemizedView.style.display = 'none';
        
        const case8RedesignView = document.getElementById('case8-redesign-view');
        if (case8RedesignView) case8RedesignView.style.display = 'none';
        
        mainFooter.style.display = 'flex';
        mainHeader.style.display = 'flex';
        
        menuItems.forEach(mi => {
            mi.classList.remove('active');
            if(mi.getAttribute('data-case') === caseNum) mi.classList.add('active');
        });

        if (['8', '2', '3', '4', '5'].includes(caseNum)) {
            const case8RedesignView = document.getElementById('case8-redesign-view');
            if (case8RedesignView) case8RedesignView.style.display = 'flex';
            mainFooter.style.display = 'none'; // Hide global Buy button
            
            const separator = document.querySelector('.case8-separator');
            const bottomCard = document.querySelector('.case8-card-optimo');
            const line2 = document.getElementById('top-card-line2');
            const revertContainer = document.getElementById('revert-link-container');
            const med1Note = document.getElementById('top-card-med1-note');
            const med2Note = document.getElementById('top-card-med2-note');
            const incompleteBadge = document.getElementById('incomplete-badge');
            
            // Default: clear notes, badges and classes
            if (med1Note) { med1Note.style.display = 'none'; med1Note.innerHTML = ''; }
            if (med2Note) { med2Note.style.display = 'none'; med2Note.innerHTML = ''; }
            if (incompleteBadge) incompleteBadge.style.display = 'none';
            
            const med1Row = document.getElementById('top-card-med1-name').parentElement;
            const med2Row = document.getElementById('top-card-med2-name').parentElement;
            if (med1Row) med1Row.classList.remove('item-out-of-stock');
            if (med2Row) med2Row.classList.remove('item-out-of-stock');
            
            if (caseNum === '2') {
                // ... (Case 2 logic)
                if (separator) separator.style.display = 'none';
                if (bottomCard) bottomCard.style.display = 'none';
                if (line2) line2.style.display = 'none';
                if (revertContainer) revertContainer.style.display = 'none';
                
                document.getElementById('top-card-main-title').textContent = 'Tu receta está lista';
                document.getElementById('top-card-main-subtitle').innerHTML = 'Precio de referencia en cadenas: <del>$133.375</del>';
                document.getElementById('top-card-line1').innerHTML = 'Con happ pagas <span>$80.000</span>';
                document.getElementById('top-card-img').src = 'assets/Pills.png';
                
                document.getElementById('top-card-med1-name').textContent = 'Enalapril 10 Mg';
                document.getElementById('top-card-med1-price').textContent = '$21.570';
                document.getElementById('top-card-med2-name').textContent = 'Atorvastatina 10 Mg';
                document.getElementById('top-card-med2-price').textContent = '$109.815';
                
                document.getElementById('top-card-total').textContent = '$80.000';
                document.getElementById('top-card-btn').textContent = 'Ir a comprar por $80.000';
            } else if (caseNum === '3') {
                // ... (Case 3 logic)
                if (separator) separator.style.display = 'flex';
                if (bottomCard) bottomCard.style.display = 'block';
                if (line2) line2.style.display = 'block';
                
                document.getElementById('top-card-main-title').textContent = 'Tu receta está lista';
                document.getElementById('top-card-main-subtitle').innerHTML = 'Precio de referencia en cadenas: <del>$133.375</del>';
                document.getElementById('top-card-line1').innerHTML = 'Con happ pagas <span>$80.000</span>';
                document.getElementById('top-card-line2').textContent = 'Ahorras $53.375';
                document.getElementById('top-card-img').src = 'assets/Pills.png';
                
                const bioBadgeSpan = '<img src="assets/bio_logo_user.png" alt="B" style="height: 18px; width: auto; margin-right: 6px; vertical-align: middle; border-radius: 4px;">';
                document.getElementById('top-card-med1-name').innerHTML = bioBadgeSpan + 'Atorvastatina 20 Mg (Opko)';
                document.getElementById('top-card-med1-price').textContent = '$1.488';
                
                if (med1Note) {
                    med1Note.style.display = 'block';
                    med1Note.innerHTML = `
                        <div class="replacement-note">
                            <div class="warn-icon">!</div>
                            <div>Cozaar 50 Mg sin stock. Se reemplaza por su bioequivalente.</div>
                        </div>
                    `;
                }
                
                document.getElementById('top-card-med2-name').textContent = 'Lipitor 10 Mg';
                document.getElementById('top-card-med2-price').textContent = '$109.815';
                
                document.getElementById('top-card-total').textContent = '$113.293';
                document.getElementById('top-card-btn').textContent = 'Ir a comprar por $113.293';
            } else if (caseNum === '4') {
                // ... (Case 4 logic)
                if (separator) separator.style.display = 'flex';
                if (bottomCard) bottomCard.style.display = 'block';
                if (line2) line2.style.display = 'block';
                if (incompleteBadge) incompleteBadge.style.display = 'block';
                
                document.getElementById('top-card-main-title').textContent = 'Tu receta está lista';
                document.getElementById('top-card-main-subtitle').innerHTML = 'Precio de referencia en cadenas: <del>$133.375</del>';
                document.getElementById('top-card-line1').innerHTML = 'Con happ pagas <span>$80.000</span>';
                document.getElementById('top-card-line2').textContent = 'Ahorras $53.375';
                document.getElementById('top-card-img').src = 'assets/Pills.png';
                
                document.getElementById('top-card-med1-name').textContent = 'Cozaar 50 Mg';
                document.getElementById('top-card-med1-price').textContent = '$21.570';
                
                document.getElementById('top-card-med2-name').textContent = 'Ibuprofeno 400 Mg';
                document.getElementById('top-card-med2-price').textContent = '$1.300';
                if (med2Row) med2Row.classList.add('item-out-of-stock');
                
                document.getElementById('top-card-total').textContent = '$80.000';
                document.getElementById('top-card-btn').textContent = 'Ir a comprar por $80.000';
            } else {
                // Case 8 or 5 (Initially identical original cart)
                if (separator) separator.style.display = 'flex';
                if (bottomCard) bottomCard.style.display = 'block';
                if (line2) line2.style.display = 'block';
                
                document.getElementById('top-card-main-title').textContent = 'Tu receta está lista';
                document.getElementById('top-card-main-subtitle').innerHTML = 'Precio de referencia en cadenas: <del>$35.500</del>';
                document.getElementById('top-card-line1').innerHTML = 'Con happ pagas <span>$19.686</span>';
                document.getElementById('top-card-line2').textContent = 'Ahorras $15.814';
                document.getElementById('top-card-img').src = 'assets/Pills.png';
                
                document.getElementById('top-card-med1-name').textContent = 'Trex 500 Mg (Azitromicina)';
                document.getElementById('top-card-med1-price').textContent = '$13.990';
                document.getElementById('top-card-med2-name').textContent = 'Ciprofloxacino 500 Mg (Ciprofloxacino)';
                document.getElementById('top-card-med2-price').textContent = '$746';
                
                // Note: We might need to handle med3 if it's dynamic, but since we updated HTML, 
                // we should also ensure med3 is visible or set.
                const med3Row = document.getElementById('top-card-med3-name')?.parentElement;
                if (med3Row) {
                    document.getElementById('top-card-med3-name').textContent = 'Kitadol 1000 Mg (Paracetamol)';
                    document.getElementById('top-card-med3-price').textContent = '$4.950';
                }

                document.getElementById('top-card-total').textContent = '$19.686';
                document.getElementById('top-card-btn').textContent = 'Ir a comprar por $19.686';
            }
        } else if (caseNum === '1') {
            comparisonView.style.display = 'grid';
            cartSummaryGroup.style.display = 'block';
            infoBox.style.display = 'block';
            
            const cardBio = comparisonView.querySelector('.card-bio');
            cards.forEach(c => c.classList.remove('selected'));
            cardBio.classList.add('selected');
            renderSummary('inteligente');
        } else if (caseNum === '7') {
            emptyStateView.style.display = 'flex';
            mainFooter.style.display = 'none';
        } else if (caseNum === 'info') {
            mainFooter.style.display = 'none';
            infoView.style.display = 'flex';
        }
    }

    function renderItemizedView(type) {
        const isBio = (type === 'bio');
        itemizedViewMode = type;
        
        const itemizedSubtitle = document.getElementById('itemized-subtitle');
        const itemizedHeaderIcon = document.getElementById('itemized-header-icon');
        const itemizedBadge = document.getElementById('itemized-badge');
        const bioDisclaimer = document.getElementById('bio-disclaimer-box');
        const btnBuyNow = itemizedView.querySelector('.btn-buy-now');
        const statusBadge = document.getElementById('itemized-status-badge');
        
        // Clear previous state
        bioDisclaimer.style.display = 'none';
        
        if (currentCase === '8') {
            itemizedMainTitle.textContent = isBio ? 'Carrito optimo' : 'Tu carrito';
            itemizedSubtitle.innerHTML = isBio ? '<span style="font-size: 0.95rem; font-weight: 500; color: #166534;">Ahorrás $12.409</span>' : '<span style="font-size: 0.95rem; font-weight: 500; color: #4B5563;">En grandes marcas <span style="text-decoration: line-through; opacity: 0.8; margin-left: 4px;">$35.500</span></span>';
            itemizedHeaderIcon.src = isBio ? 'assets/piggy-bank.png' : 'assets/Pills.png';
            bioDisclaimer.style.display = 'none'; // Explicitly hidden as requested
            itemizedLabel.textContent = 'TOTAL';
            itemizedTotal.textContent = isBio ? '$11.267' : '$23.676';
            itemizedTotal.style.color = isBio ? '#27AE60' : '#4B5563'; // Green for savings, Grey for original
            
            let listHtml = '';
            if (isBio) {
                listHtml = wrapRows(`
                    <div class="itemized-row"><span><img src="assets/bio_icon.png" class="bio-indicator-icon"> Azitromicina 500 Mg (Azitromicina)</span><span>$1.490</span></div>
                    <div class="itemized-row"><span><img src="assets/bio_icon.png" class="bio-indicator-icon"> Ciprofloxacino 500 Mg (Ciprofloxacino)</span><span>$827</span></div>
                    <div class="itemized-row"><span>Kitadol 1000 Mg (Paracetamol)</span><span>$4.960</span></div>
                    <div class="itemized-row delivery"><span>Despacho a domicilio <span class="info-icon-small" data-tooltip="Todos los carritos incluyen despacho a domicilio." style="margin-left: 4px; font-style: normal; font-weight: 600;">?</span></span><span>$3.990</span></div>
                `);
            } else {
                listHtml = wrapRows(`
                    <div class="itemized-row"><span>Trex 500 Mg (Azitromicina)</span><span>$13.990</span></div>
                    <div class="itemized-row"><span>Ciprofloxacino 500 Mg (Ciprofloxacino)</span><span>$746</span></div>
                    <div class="itemized-row"><span>Kitadol 1000 Mg (Paracetamol)</span><span>$4.950</span></div>
                    <div class="itemized-row delivery"><span>Despacho a domicilio <span class="info-icon-small" data-tooltip="Todos los carritos incluyen despacho a domicilio." style="margin-left: 4px; font-style: normal; font-weight: 600;">?</span></span><span>$3.990</span></div>
                `);
            }
            itemizedList.innerHTML = listHtml;
            statusBadge.innerHTML = `<span class="dot">●</span> 2/2`;
        }

        if (isBio) {
            statusBadge.className = 'status-badge-green';
            btnBuyNow.classList.add('recommended');
        } else {
            statusBadge.className = 'status-badge-blue';
            btnBuyNow.classList.remove('recommended');
        }
        
        returnLink.style.display = isBio ? 'block' : 'none';
    }

    // Toggle Sticky Banner -> Bio
    stickyBanner.addEventListener('click', () => {
        stickyBanner.style.display = 'none';
        itemizedView.style.opacity = '0';
        setTimeout(() => {
            renderItemizedView('bio');
            itemizedView.style.opacity = '1';
        }, 300);
    });

    // Toggle Return -> Original
    returnLink.addEventListener('click', () => {
        renderItemizedView('original');
        setTimeout(() => { if(['8', '3', '5'].includes(currentCase)) stickyBanner.style.display = 'flex'; }, 500);
    });

    // Summary rendering (Cases 1, 3, 4)
    function renderSummary(type) {
        const isBio = (type === 'inteligente');
        summaryTitle.textContent = isBio ? 'Carrito optimo' : 'Carrito Original';
        
        // Use infoBox if defined, otherwise fetch it
        const infoBoxEl = document.getElementById('info-box');
        if (infoBoxEl) {
            infoBoxEl.style.display = isBio ? 'block' : 'none';
        }

        if (!isBio) {
            itemsList.innerHTML = wrapRows(`
                <div class="detail-row"><span>Trex 500 Mg (Azitromicina)</span><span>$13.990</span></div>
                <div class="detail-row"><span>Ciprofloxacino 500 Mg (Ciprofloxacino)</span><span>$746</span></div>
                <div class="detail-row"><span>Kitadol 1000 Mg (Paracetamol)</span><span>$4.950</span></div>
                <div class="detail-row delivery"><span>Despacho a domicilio <span class="info-icon-small" data-tooltip="Todos los carritos incluyen despacho a domicilio." style="margin-left: 4px; font-style: normal; font-weight: 600;">?</span></span><span>$3.990</span></div>
                <hr>
                <div class="detail-row total-row"><span>TOTAL ORIGINAL</span><span>$23.676</span></div>
            `);
        } else {
            itemsList.innerHTML = wrapRows(`
                <div class="detail-row"><span><img src="assets/bio_icon.png" class="bio-indicator-icon" style="height: 14px; margin-right: 4px;"> Azitromicina 500 Mg (Azitromicina)</span><span>$1.490</span></div>
                <div class="detail-row"><span><img src="assets/bio_icon.png" class="bio-indicator-icon" style="height: 14px; margin-right: 4px;"> Ciprofloxacino 500 Mg (Ciprofloxacino)</span><span>$827</span></div>
                <div class="detail-row"><span>Kitadol 1000 Mg (Paracetamol)</span><span>$4.960</span></div>
                <div class="detail-row delivery"><span>Despacho a domicilio <span class="info-icon-small" data-tooltip="Todos los carritos incluyen despacho a domicilio." style="margin-left: 4px; font-style: normal; font-weight: 600;">?</span></span><span>$3.990</span></div>
                <hr>
                <div class="detail-row total-row"><span>TOTAL CON BIO</span><span>$11.267</span></div>
            `);
        }
    }
    const sideMenu = document.getElementById('side-menu');
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle && sideMenu) {
        menuToggle.addEventListener('click', () => {
            sideMenu.classList.toggle('open');
        });
    }

    if (menuItems) {
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                if (item.id === 'info-case-btn') { navigateToCase('info'); return; }
                navigateToCase(item.getAttribute('data-case'));
                sideMenu.classList.remove('open');
            });
        });
    }

    // Case 8 Redesign Buttons
    const case8GreenBtn = document.querySelector('.btn-case8-green');
    if (case8GreenBtn) {
        case8GreenBtn.addEventListener('click', () => {
            const savingsLine = document.getElementById('top-card-line2');
            if (savingsLine) {
                savingsLine.classList.remove('highlight-savings');
                void savingsLine.offsetWidth; // Trigger reflow to restart animation
                savingsLine.classList.add('highlight-savings');
            }
        });
    }
    
    const case8OutlineBtn = document.querySelector('.btn-case8-outline');
    if (case8OutlineBtn) {
        case8OutlineBtn.addEventListener('click', () => {
            navigateToMode('optimo');
            const topCard = document.querySelector('.case8-card');
            const cards = document.querySelectorAll('.case8-card');
            const separator = document.querySelector('.case8-separator');
            
            // Animación Ultra Pro = 3D Flip + Glow + Ticker
            topCard.style.transition = 'all 0.35s ease-in';
            // Start of 3D lift
            topCard.style.transform = 'perspective(1000px) rotateX(10deg) scale(0.96)';
            topCard.style.boxShadow = '0 30px 60px rgba(53, 141, 86, 0.4)';
            
            // Phase 1: Flip sideways
            setTimeout(() => {
                topCard.style.transform = 'perspective(1000px) rotateY(90deg) scale(0.96)';
                topCard.style.opacity = '0.5';
            }, 150);
            
            // Animación para desaparecer la tarjeta inferior
            if (cards.length > 1) {
                cards[1].style.transition = 'all 0.4s ease';
                cards[1].style.opacity = '0';
                cards[1].style.transform = 'translateY(30px) scale(0.8)';
            }
            if (separator) {
                separator.style.transition = 'opacity 0.2s ease';
                separator.style.opacity = '0';
            }

            // Phase 2: Update content when card is perfectly sideways (invisible edge)
            setTimeout(() => {
                // Actualizar textos de cabecera
                const mainTitle = document.getElementById('top-card-main-title');
                if (mainTitle) mainTitle.innerHTML = 'Opciones bioequivalentes';
                
                const mainSubtitle = document.getElementById('top-card-main-subtitle');
                if (mainSubtitle) mainSubtitle.innerHTML = 'certificados ISP - misma eficacia';

                const grayBoxHeader = document.getElementById('case8-gray-box-header');
                if (grayBoxHeader) {
                    const span = grayBoxHeader.querySelector('span');
                    if (span) span.textContent = '3 medicamentos cotizados';
                }

                // Counter animation for the Savings line
                let savingsCount = 0;
                let targetSavings = 12409;
                const savingsEl = document.getElementById('top-card-line2');
                if (savingsEl) {
                    savingsEl.innerHTML = '<span style="color: #166534; font-weight: 600;">Ahorrás $0</span>';
                    const savingsInterval = setInterval(() => {
                        savingsCount += Math.floor(targetSavings / 12);
                        if (savingsCount >= targetSavings) {
                            savingsCount = targetSavings;
                            clearInterval(savingsInterval);
                            // Little bounce when finishing
                            savingsEl.style.transform = 'scale(1.2)';
                            setTimeout(() => savingsEl.style.transform = 'scale(1)', 200);
                        }
                        const formattedSavings = '$' + savingsCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        savingsEl.innerHTML = `<span style="color: #166534; font-weight: 600;">Ahorrás ${formattedSavings}</span>`;
                    }, 60);
                }
                
                const img = document.getElementById('top-card-img');
                if (img) img.src = 'assets/piggy-bank.png';

                const bioBadgeSpan = '<img src="assets/bio_logo_user.png" alt="B" style="height: 18px; width: auto; margin-right: 6px; vertical-align: middle; border-radius: 4px;">';
                
                // Update the medication list using wrapRows for staggered animation
                const itemsListContent = `
                    <div class="case8-item-row">
                        <span id="top-card-med1-name">${bioBadgeSpan}Azitromicina 500 Mg (Azitromicina)</span>
                        <span id="top-card-med1-price">$1.490</span>
                    </div>
                    <div class="case8-item-row">
                        <span id="top-card-med2-name">${bioBadgeSpan}Ciprofloxacino 500 Mg (Ciprofloxacino)</span>
                        <span id="top-card-med2-price">$827</span>
                    </div>
                    <div class="case8-item-row">
                        <span id="top-card-med3-name">Kitadol 1000 Mg (Paracetamol)</span>
                        <span id="top-card-med3-price">$4.960</span>
                    </div>
                    <div class="case8-item-row delivery" style="color: #6B7280; font-size: 0.85rem;">
                        <span>Despacho a domicilio <span style="display: inline-flex; justify-content: center; align-items: center; width: 14px; height: 14px; border: 1px solid #9CA3AF; border-radius: 50%; font-size: 0.6rem; margin-left: 4px;">?</span></span>
                        <span>$3.990</span>
                    </div>
                `;
                const case8Content = document.getElementById('case8-gray-box-content');
                if (case8Content) {
                    case8Content.innerHTML = wrapRows(itemsListContent);
                    case8Content.style.display = 'block';
                    const chevron = document.getElementById('case8-gray-box-header').querySelector('.chevron-icon');
                    if (chevron) chevron.style.transform = 'rotate(180deg)';
                }

                // Hide notes in optimal view
                const med1Note = document.getElementById('top-card-med1-note');
                const med2Note = document.getElementById('top-card-med2-note');
                if (med1Note) med1Note.style.display = 'none';
                if (med2Note) med2Note.style.display = 'none';

                // Add gray note if Case 5
                if (currentCase === '5' && med1Note) {
                    med1Note.style.display = 'block';
                    med1Note.innerHTML = `
                        <div class="gray-note">
                            <div class="info-circle">i</div>
                            <div>Hay disponible solo de marca por el momento.</div>
                        </div>
                    `;
                }

                // Ocultar del DOM tras la animación a las tarjetas inferiores
                if (separator) separator.style.display = 'none';
                if (cards.length > 1) cards[1].style.display = 'none';

                // Setup the other side of the flip
                topCard.style.transition = 'none';
                topCard.style.transform = 'perspective(1000px) rotateY(-90deg) scale(0.96)';

                // Phase 3: Flip back in + Money Counter Effect
                setTimeout(() => {
                    topCard.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    topCard.style.opacity = '1';
                    topCard.style.transform = 'perspective(1000px) rotateY(0deg) scale(1)';
                    topCard.style.boxShadow = '0 10px 25px rgba(53, 141, 86, 0.15)'; 
                    
                    // Shimmer effect
                    topCard.classList.add('card-shimmer');
                    setTimeout(() => topCard.classList.remove('card-shimmer'), 1000);

                    const totalEl = document.getElementById('top-card-total');
                    const topBtn = document.getElementById('top-card-btn');

                    // Casino-like price drop!
                    let count = 19686;
                    let targetFinal = 7277;
                    if (currentCase === '4') targetFinal = 3478;
                    if (currentCase === '5') targetFinal = 25048;

                    const interval = setInterval(() => {
                        count -= Math.floor(Math.random() * 8000 + 4000); 
                        if(count <= targetFinal) {
                            count = targetFinal;
                            clearInterval(interval);
                        }
                        const formatted = '$' + count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        if (topBtn) topBtn.innerHTML = `Ir a comprar por ${formatted}`;
                        if (totalEl) totalEl.innerHTML = formatted;
                    }, 40);

                    // Pulse effect at the end of transition
                    setTimeout(() => {
                        const savingsLine = document.getElementById('top-card-line2');
                        if (savingsLine) {
                            savingsLine.classList.remove('highlight-savings');
                            void savingsLine.offsetWidth;
                            savingsLine.classList.add('highlight-savings');
                        }
                        
                        // Show revert link container in optimal view
                        const revertContainer = document.getElementById('revert-link-container');
                        if (revertContainer) revertContainer.style.display = 'block';
                    }, 600); 

                }, 50);
            }, 500);
        });
    }

    // Reversión del carrito original
    const btnRevertOriginal = document.getElementById('btn-revert-original');
    if (btnRevertOriginal) {
        btnRevertOriginal.addEventListener('click', () => {
            navigateToMode('original');
            const topCard = document.querySelector('.case8-card');
            const cards = document.querySelectorAll('.case8-card');
            const separator = document.querySelector('.case8-separator');
            
            // Animación Reversa 3D
            topCard.style.transition = 'all 0.35s ease-in';
            topCard.style.transform = 'perspective(1000px) rotateX(10deg) scale(0.96)';
            topCard.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.1)';
            
            // Phase 1: Flip sideways
            setTimeout(() => {
                topCard.style.transform = 'perspective(1000px) rotateY(-90deg) scale(0.96)';
                topCard.style.opacity = '0.5';
            }, 150);
            
            setTimeout(() => {
                // Restoration Texts
                const mainTitle = document.getElementById('top-card-main-title');
                if (mainTitle) mainTitle.innerHTML = 'Tu carrito ya esta disponible';
                
                const mainSubtitle = document.getElementById('top-card-main-subtitle');
                if (mainSubtitle) mainSubtitle.innerHTML = 'Precio referencia: <del>$35.500</del>';

                document.getElementById('top-card-line1').innerHTML = 'Con happ pagas <span>$19.686</span>';
                document.getElementById('top-card-line2').innerHTML = 'Ahorras $15.814';
                
                const img = document.getElementById('top-card-img');
                if (img) img.src = 'assets/Pills.png';

                document.getElementById('top-card-med1-name').innerHTML = 'Trex 500 Mg (Azitromicina)';
                document.getElementById('top-card-med1-price').innerHTML = '$13.990';
                
                document.getElementById('top-card-med2-name').innerHTML = 'Ciprofloxacino 500 Mg (Ciprofloxacino)';
                document.getElementById('top-card-med2-price').innerHTML = '$746';
                
                const med3Name = document.getElementById('top-card-med3-name');
                const med3Price = document.getElementById('top-card-med3-price');
                if (med3Name) med3Name.innerHTML = 'Kitadol 1000 Mg (Paracetamol)';
                if (med3Price) med3Price.innerHTML = '$4.950';

                const totalEl = document.getElementById('top-card-total');
                if (totalEl) {
                    totalEl.innerHTML = '$4.509'; // temporal para luego subir
                    totalEl.style.color = '#111827';
                }
                
                const topBtn = document.getElementById('top-card-btn');
                if (topBtn) topBtn.innerHTML = 'Ir a comprar por $4.509'; // temporal para el conteo

                const revertContainer = document.getElementById('revert-link-container');
                if (revertContainer) revertContainer.style.display = 'none';

                // Ensure the medicine list is open when reverting
                const case8Content = document.getElementById('case8-gray-box-content');
                if (case8Content) {
                    case8Content.style.display = 'block';
                    const chevron = document.getElementById('case8-gray-box-header').querySelector('.chevron-icon');
                    if (chevron) chevron.style.transform = 'rotate(180deg)';
                }

                // Restore notes if in Case 3
                if (currentCase === '3') {
                    const med1Note = document.getElementById('top-card-med1-note');
                    if (med1Note) med1Note.style.display = 'block';
                }

                // Re-show bottom card and separator
                if (separator) {
                    separator.style.display = 'flex';
                    separator.style.opacity = '1';
                }
                if (cards.length > 1) {
                    cards[1].style.display = 'block';
                    cards[1].style.opacity = '1';
                    cards[1].style.transform = 'translateY(0) scale(1)';
                }

                // Setup flip other side
                topCard.style.transition = 'none';
                topCard.style.transform = 'perspective(1000px) rotateY(90deg) scale(0.96)';

                // Phase 3: Flip back in + Money Counter Effect (Count UP)
                setTimeout(() => {
                    topCard.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    topCard.style.opacity = '1';
                    topCard.style.transform = 'perspective(1000px) rotateY(0deg) scale(1)';
                    topCard.style.boxShadow = ''; // fallback back to style.css normal

                    // Casino-like price climb back up
                    let count = 7277;
                    if (currentCase === '4') count = 3478;
                    if (currentCase === '5') count = 25048;

                    const interval = setInterval(() => {
                        count += Math.floor(Math.random() * 2000 + 1000); 
                        if(count >= 19686) {
                            count = 19686;
                            clearInterval(interval);
                        }
                        const formatted = '$' + count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                        if (topBtn) topBtn.innerHTML = `Ir a comprar por ${formatted}`;
                        if (totalEl) totalEl.innerHTML = formatted;
                    }, 40);

                    // Pulse effect at the end of revert
                    setTimeout(() => {
                        const savingsLine = document.getElementById('top-card-line2');
                        if (savingsLine) {
                            savingsLine.classList.remove('highlight-savings');
                            void savingsLine.offsetWidth;
                            savingsLine.classList.add('highlight-savings');
                        }
                    }, 600);

                }, 50);
            }, 500);
        });
    }

    // Case 8 Accordion
    const case8Header = document.getElementById('case8-gray-box-header');
    const case8Content = document.getElementById('case8-gray-box-content');
    if (case8Header && case8Content) {
        case8Header.addEventListener('click', () => {
            const isVisible = case8Content.style.display !== 'none';
            case8Content.style.display = isVisible ? 'none' : 'block';
            
            const chevron = case8Header.querySelector('.chevron-icon');
            if (chevron) {
                chevron.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
            }
        });
    }

    // Case 2 Accordion
    const case2Header = document.getElementById('case2-details-header');
    const case2Content = document.getElementById('case2-details-content');
    if (case2Header && case2Content) {
        case2Header.addEventListener('click', () => {
            const isVisible = case2Content.style.display !== 'none';
            case2Content.style.display = isVisible ? 'none' : 'block';
            
            const chevron = case2Header.querySelector('.chevron-icon');
            if (chevron) {
                chevron.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
            }
        });
    }

    // Funcionalidad de Búho Removida según solicitud del usuario
    function showBuhoScreen() {
        // Redirección deshabilitada
    }

    window.addEventListener('popstate', () => {
        const params = new URLSearchParams(window.location.search);
        switchCase(params.get('case') || '8');
    });
    
    // Initial check for mode
    const initialParams = new URLSearchParams(window.location.search);
    if (initialParams.get('case') === '8' && initialParams.get('mode') === 'optimo') {
        // Trigger the change without animation for initial load if needed, 
        // but the animation is part of the experience. 
        // For now, let's just make sure the UI reflects it.
        const btn = document.querySelector('.btn-case8-outline');
        if(btn) btn.click(); 
    }
    
    switchCase(new URLSearchParams(window.location.search).get('case') || '8');
});
