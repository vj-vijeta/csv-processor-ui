 // Interface Segregation
 class ISpaceExplorer {
    explore() { throw new Error('Not implemented'); }
    conductExperiment() { throw new Error('Not implemented'); }
    studyPhenomena() { throw new Error('Not implemented'); }
  }

  class IStarGuide {
    mapStarSystems() { throw new Error('Not implemented'); }
    navigatePaths() { throw new Error('Not implemented'); }
    guideTravelers() { throw new Error('Not implemented'); }
  }

  class ICosmicKeeper {
    maintainBalance() { throw new Error('Not implemented'); }
    overseeRealms() { throw new Error('Not implemented'); }
    guardGates() { throw new Error('Not implemented'); }
  }

  class CosmicEntity {
    constructor(name, constellation) {
      this.name = name;
      this.constellation = constellation;
    }
  }

  class Explorer extends CosmicEntity {
    explore() { return `${this.name} is exploring new galaxies`; }
    conductExperiment() { return `${this.name} is conducting cosmic experiments`; }
    studyPhenomena() { return `${this.name} is studying celestial phenomena`; }
  }

  class Guide extends CosmicEntity {
    mapStarSystems() { return `${this.name} is mapping star systems`; }
    navigatePaths() { return `${this.name} is navigating stellar paths`; }
    guideTravelers() { return `${this.name} is guiding cosmic travelers`; }
  }

  class Keeper extends CosmicEntity {
    maintainBalance() { return `${this.name} is maintaining cosmic harmony`; }
    overseeRealms() { return `${this.name} is overseeing the realms`; }
    guardGates() { return `${this.name} is guarding dimensional gates`; }
  }

  function processCSV() {
    const file = document.getElementById('csvFile').files[0];
    if (!file) {
      alert('Please upload cosmic data');
      return;
    }

    Papa.parse(file, {
      header: true,
      complete: function(results) {
        displayUsers(results.data);
      }
    });
  }

  function displayUsers(users) {
    const container = document.getElementById('reports');
    container.innerHTML = '';
    
    users.forEach(userData => {
      let entity;
      let actions = [];
      let roleClass = '';
      
      switch (userData.role.toLowerCase()) {
        case 'student':
          entity = new Explorer(userData.name, userData.email);
          actions = [
            entity.explore(),
            entity.conductExperiment(),
            entity.studyPhenomena()
          ];
          roleClass = 'from-blue-400 to-blue-600';
          break;
        case 'teacher':
          entity = new Guide(userData.name, userData.email);
          actions = [
            entity.mapStarSystems(),
            entity.navigatePaths(),
            entity.guideTravelers()
          ];
          roleClass = 'from-purple-400 to-purple-600';
          break;
        case 'admin':
          entity = new Keeper(userData.name, userData.email);
          actions = [
            entity.maintainBalance(),
            entity.overseeRealms(),
            entity.guardGates()
          ];
          roleClass = 'from-indigo-400 to-indigo-600';
          break;
      }

      const card = document.createElement('div');
      card.className = 'bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 transform transition-all duration-300 hover:scale-105';
      card.innerHTML = `
        <div class="mb-4">
          <h3 class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${roleClass}">
            ${entity.name}
          </h3>
          <p class="text-slate-400">${entity.constellation}</p>
        </div>
        <div class="space-y-3">
          ${actions.map(action => `
            <p class="text-blue-300 text-sm flex items-center">
              <span class="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
              ${action}
            </p>
          `).join('')}
        </div>
      `;
      
      container.appendChild(card);
    });
  }

  function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('-translate-x-full');
  }