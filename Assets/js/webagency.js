// Attendre que le document soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Récupérer les éléments du formulaire
    const contactForm = document.getElementById('contact');
    const nameInput = document.getElementById('inputName');
    const emailInput = document.getElementById('inputEmail');
    const subjectInput = document.getElementById('inputSubject');
    const messageInput = document.getElementById('inputMessage');
    
    // Créer une div pour afficher les résultats (à ajouter après le formulaire)
    const resultDiv = document.createElement('div');
    resultDiv.className = 'result-container mt-4 p-3 d-none';
    contactForm.parentNode.insertBefore(resultDiv, contactForm.nextSibling);
    
    // Fonction pour vérifier si un champ est vide
    function isEmpty(value) {
        return value.trim() === '';
    }
    
    // Fonction pour vérifier si un email est valide
    function isValidEmail(email) {
        // Expression régulière simple pour vérifier le format d'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Fonction pour afficher une erreur
    function showError(input, message) {
        // Trouver le parent du champ (div.mb-3)
        const formGroup = input.parentElement;
        
        // Supprimer les messages d'erreur existants
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Créer et ajouter le message d'erreur
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-danger mt-1';
        errorDiv.textContent = message;
        
        // Ajouter après l'input
        formGroup.appendChild(errorDiv);
        
        // Ajouter une classe d'erreur à l'input
        input.classList.add('is-invalid');
    }
    
    // Fonction pour supprimer les erreurs
    function clearError(input) {
        // Trouver le parent du champ (div.mb-3)
        const formGroup = input.parentElement;
        
        // Supprimer les messages d'erreur existants
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Supprimer la classe d'erreur
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    }
    
    // Ajouter des écouteurs d'événements pour la validation en temps réel
    nameInput.addEventListener('blur', function() {
        if (isEmpty(this.value)) {
            showError(this, 'Le nom est requis');
        } else {
            clearError(this);
        }
    });
    
    emailInput.addEventListener('blur', function() {
        if (isEmpty(this.value)) {
            showError(this, 'L\'email est requis');
        } else if (!isValidEmail(this.value)) {
            showError(this, 'Veuillez entrer un email valide');
        } else {
            clearError(this);
        }
    });
    
    subjectInput.addEventListener('blur', function() {
        if (isEmpty(this.value)) {
            showError(this, 'Le sujet est requis');
        } else {
            clearError(this);
        }
    });
    
    messageInput.addEventListener('blur', function() {
        if (isEmpty(this.value)) {
            showError(this, 'Le message est requis');
        } else if (this.value.length < 10) {
            showError(this, 'Le message doit contenir au moins 10 caractères');
        } else {
            clearError(this);
        }
    });
    
    // Gérer la soumission du formulaire
    contactForm.addEventListener('submit', function(event) {
        // Empêcher l'envoi du formulaire
        event.preventDefault();
        
        // Vérifier tous les champs
        let hasErrors = false;
        
        if (isEmpty(nameInput.value)) {
            showError(nameInput, 'Le nom est requis');
            hasErrors = true;
        }
        
        if (isEmpty(emailInput.value)) {
            showError(emailInput, 'L\'email est requis');
            hasErrors = true;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Veuillez entrer un email valide');
            hasErrors = true;
        }
        
        if (isEmpty(subjectInput.value)) {
            showError(subjectInput, 'Le sujet est requis');
            hasErrors = true;
        }
        
        if (isEmpty(messageInput.value)) {
            showError(messageInput, 'Le message est requis');
            hasErrors = true;
        } else if (messageInput.value.length < 10) {
            showError(messageInput, 'Le message doit contenir au moins 10 caractères');
            hasErrors = true;
        }
        
        // Si pas d'erreurs, afficher les données
        if (!hasErrors) {
            // Récupérer les données du formulaire
            const formData = {
                nom: nameInput.value,
                email: emailInput.value,
                sujet: subjectInput.value,
                message: messageInput.value
            };
            
            // Afficher les données dans la div de résultat
            resultDiv.innerHTML = `
                <h4 class="text-center mb-3">Merci pour votre message !</h4>
                <div class="card">
                    <div class="card-body">
                        <p><strong>Nom :</strong> ${formData.nom}</p>
                        <p><strong>Email :</strong> ${formData.email}</p>
                        <p><strong>Sujet :</strong> ${formData.sujet}</p>
                        <p><strong>Message :</strong> ${formData.message}</p>
                    </div>
                </div>
                <div class="text-center mt-3">
                    <button id="resetForm" class="btn btn-secondary">Effacer ce message</button>
                </div>
            `;
            
            // Afficher la div de résultat (le formulaire reste visible)
            resultDiv.classList.remove('d-none');
            
            // Ajouter un écouteur d'événement pour le bouton de réinitialisation
            document.getElementById('resetForm').addEventListener('click', function() {
                // Réinitialiser le formulaire
                contactForm.reset();
                
                // Supprimer les classes de validation
                const inputs = contactForm.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.classList.remove('is-valid', 'is-invalid');
                });
                
                // Masquer la div de résultat
                resultDiv.classList.add('d-none');
            });
        }
    });
    
    // Ajouter des effets de style pour améliorer l'expérience utilisateur
    
    // Effet de focus sur les champs
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transition = 'transform 0.3s ease';
            this.parentElement.style.transform = 'translateX(5px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateX(0)';
        });
    });
    
    // Effet sur le bouton d'envoi
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.addEventListener('mouseover', function() {
        this.style.transition = 'transform 0.3s ease, background-color 0.3s ease';
        this.style.transform = 'scale(1.05)';
    });
    
    submitButton.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
    
    // Gérer les liens de navigation pour qu'ils pointent vers les bonnes sections
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Récupérer le texte du lien et trouver la section correspondante
            const linkText = this.textContent.trim().toLowerCase();
            let targetId;
            
            switch(linkText) {
                case 'accueil':
                    targetId = 'slider';
                    break;
                case 'services':
                    targetId = 'services';
                    break;
                case 'portfolio':
                    targetId = 'projets';
                    break;
                case 'contact':
                    targetId = 'contact';
                    break;
                default:
                    targetId = '';
            }
            
            if (targetId) {
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    // Faire défiler jusqu'à la section
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    
                    // Mettre à jour la classe active
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });
});
