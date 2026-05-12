document.addEventListener('DOMContentLoaded', () => {
    // 1. Typographic Reveal Animation
    const revealWords = document.querySelectorAll('.reveal-text .word');
    revealWords.forEach((word, index) => {
        word.style.opacity = '0';
        word.style.transform = 'translateY(50px)';
        word.style.transition = `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`;
        
        setTimeout(() => {
            word.style.opacity = '1';
            word.style.transform = 'translateY(0)';
        }, 100);
    });

    // 2. Magnetic Button Interaction
    const magneticBtns = document.querySelectorAll('.magnetic');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // 3. Header Scroll Effect
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 4. Scroll Reveal Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.project-item, .spirit-content, .metric-item, .skill-category').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(el);
    });
    
    // 5. Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 6. Contact Modal Logic
    const modal = document.getElementById('contact-modal');
    const triggers = document.querySelectorAll('.trigger-vision');
    const modalContent = document.querySelector('.modal-content');
    const initialModalHTML = modalContent.innerHTML;

    const bindModalLogic = () => {
        const closeBtn = modalContent.querySelector('.close-modal');
        const sendBtn = modalContent.querySelector('#send-vision');
        const messageArea = modalContent.querySelector('#contact-message');

        const closeModal = () => {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
                // Reset to initial state on close
                modalContent.style.textAlign = "left";
                modalContent.innerHTML = initialModalHTML;
                bindModalLogic();
            }, 500);
        };

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        
        if (sendBtn) {
            sendBtn.addEventListener('click', async () => {
                const message = messageArea.value.trim();
                if (message) {
                    sendBtn.innerText = "Sending...";
                    sendBtn.style.opacity = "0.5";
                    sendBtn.disabled = true;

                    try {
                        const response = await fetch("https://formsubmit.co/ajax/tairij10@gmail.com", {
                            method: "POST",
                            headers: { 
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify({
                                message: message,
                                _subject: "New Visionary Inquiry",
                                _template: "table"
                            })
                        });

                        if (response.ok) {
                            // Success state - Premium Reveal
                            modalContent.style.textAlign = "center";
                            modalContent.innerHTML = `
                                <button class="close-modal">&times;</button>
                                <div class="success-icon" style="font-size: 4rem; margin-bottom: 2rem;">⚓</div>
                                <span class="section-label">Transmission Complete</span>
                                <h2 style="margin-bottom: 1rem;">Your vision has been received.</h2>
                                <p style="margin-bottom: 3rem; opacity: 0.7;">I'll be in touch shortly to fulfill the potential of your system(s).</p>
                                <div style="display: flex; gap: 1.5rem; justify-content: center; flex-wrap: wrap;">
                                    <button id="reset-vision" class="btn-primary magnetic-success" style="width: auto; padding: 1.2rem 2.5rem;">Send another Vision</button>
                                    <button onclick="location.reload()" class="btn-primary magnetic-success" style="width: auto; padding: 1.2rem 2.5rem;">Return to the Architecture</button>
                                </div>
                            `;
                            
                            // Re-bind Close
                            modalContent.querySelector('.close-modal').addEventListener('click', closeModal);
                            
                            // Bind Reset
                            modalContent.querySelector('#reset-vision').addEventListener('click', () => {
                                modalContent.style.textAlign = "left";
                                modalContent.innerHTML = initialModalHTML;
                                bindModalLogic();
                            });
                        } else {
                            throw new Error("Transmission failed");
                        }
                    } catch (err) {
                        const mailtoUrl = `mailto:tairij10@gmail.com?subject=Visionary Inquiry&body=${encodeURIComponent(message)}`;
                        window.location.href = mailtoUrl;
                        closeModal();
                    }
                } else {
                    messageArea.placeholder = "Please enter a message first...";
                }
            });
        }
    };

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('active'), 10);
            document.body.style.overflow = 'hidden';
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
                modalContent.style.textAlign = "left";
                modalContent.innerHTML = initialModalHTML;
                bindModalLogic();
            }, 500);
        }
    });

    bindModalLogic();

    // 7. Visionary Navigator Engine
    const navTrigger = document.getElementById('nav-trigger');
    const navWindow = document.getElementById('nav-window');
    const closeNav = document.querySelector('.close-navigator');
    const navFeed = document.getElementById('nav-feed');
    const navInput = document.getElementById('nav-input');
    const navSend = document.getElementById('nav-send');
    const promptPills = document.querySelectorAll('.prompt-pill');

    const responses = {
        projects: "Orchestrating navigation to Technical Proofs... I have located the high-fidelity repositories for Knowledge Proctor and OmniFit.",
        skills: "Mapping the Technical Arsenal... Accessing RAG, MCP, and Full-stack capabilities.",
        contact: "Initiating Visionary Inquiry bridge... Preparing the communication portal.",
        vision: "Accessing the Visionary Manifest... Unlocking the core philosophy of Tairi's architecture.",
        greeting: "Welcome. I am the Navigator. I orchestrate the exploration of this architectural portfolio. How can I guide you?",
        unknown: "I am interpreting your request... To ensure precision within this architecture, please try using specific phrases from the action pills below (e.g., 'View Repos', 'Contact', or 'Manifesto')."
    };

    const addMessage = (text, sender) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `nav-message ${sender}`;
        msgDiv.innerHTML = `<p>${text}</p>`;
        navFeed.appendChild(msgDiv);
        navFeed.scrollTop = navFeed.scrollHeight;
    };

    const handleAction = (action) => {
        let text = responses[action] || responses.unknown;
        
        // Simulate thinking
        addMessage("...", "system");
        const typingMsg = navFeed.lastElementChild;

        setTimeout(() => {
            typingMsg.remove();
            addMessage(text, "system");
            
            // Execute page action
            setTimeout(() => {
                if (action === 'contact') {
                    // Trigger Modal
                    document.querySelector('.trigger-vision').click();
                } else {
                    // Scroll to ID
                    const target = document.getElementById(action);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }, 800);
        }, 1000);
    };

    const processInput = () => {
        const input = navInput.value.trim().toLowerCase();
        if (!input) return;

        addMessage(navInput.value, "user");
        navInput.value = '';

        if (input.includes("project") || input.includes("repo") || input.includes("github")) {
            handleAction("projects");
        } else if (input.includes("skill") || input.includes("arsenal") || input.includes("what can you do")) {
            handleAction("skills");
        } else if (input.includes("contact") || input.includes("email") || input.includes("hire") || input.includes("message")) {
            handleAction("contact");
        } else if (input.includes("vision") || input.includes("manifest")) {
            handleAction("vision");
        } else if (input.includes("hi") || input.includes("hello") || input.includes("hey")) {
            addMessage(responses.greeting, "system");
        } else {
            handleAction("unknown");
        }
    };

    navTrigger.addEventListener('click', () => {
        navWindow.classList.add('active');
        navTrigger.style.opacity = '0';
        navTrigger.style.pointerEvents = 'none';
    });

    closeNav.addEventListener('click', () => {
        navWindow.classList.remove('active');
        navTrigger.style.opacity = '1';
        navTrigger.style.pointerEvents = 'auto';
    });

    navSend.addEventListener('click', processInput);
    navInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') processInput();
    });

    promptPills.forEach(pill => {
        pill.addEventListener('click', () => {
            const action = pill.getAttribute('data-action');
            addMessage(pill.innerText, "user");
            handleAction(action);
        });
    });
});
