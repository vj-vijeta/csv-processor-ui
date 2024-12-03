 // Base Spellcaster - Defines the contract
 class Spellcaster {
    constructor(name, element) {
      this.name = name;
      this.element = element;
    }

    castSpell() {
      return { power: 1, element: this.element };
    }

    summonFamiliar() {
      return ['basic familiar'];
    }

    getSpellPower() {
      return 10;
    }
  }

  // Apprentice maintains LSP by extending but not breaking base behavior
  class Apprentice extends Spellcaster {
    castSpell() {
      const baseSpell = super.castSpell();
      return { ...baseSpell, power: baseSpell.power * 1.2 };
    }

    summonFamiliar() {
      return [...super.summonFamiliar(), 'novice companion'];
    }

    getSpellPower() {
      return super.getSpellPower() * 1.5;
    }
  }

  // Mage extends functionality while preserving base contract
  class Mage extends Spellcaster {
    castSpell() {
      const baseSpell = super.castSpell();
      return { ...baseSpell, power: baseSpell.power * 2 };
    }

    summonFamiliar() {
      return [...super.summonFamiliar(), 'elemental spirit', 'mystic ally'];
    }

    getSpellPower() {
      return super.getSpellPower() * 3;
    }
  }

  // Archmage maintains substitutability while adding power
  class Archmage extends Spellcaster {
    castSpell() {
      const baseSpell = super.castSpell();
      return { ...baseSpell, power: baseSpell.power * 4 };
    }

    summonFamiliar() {
      return [...super.summonFamiliar(), 'dragon familiar', 'phoenix companion'];
    }

    getSpellPower() {
      return super.getSpellPower() * 5;
    }
  }

  function processCSV() {
    const file = document.getElementById('csvFile').files[0];
    if (!file) {
      alert('Please upload your spellcaster scroll');
      return;
    }

    Papa.parse(file, {
      header: true,
      complete: function(results) {
        displayMages(results.data);
      }
    });
  }

  function displayMages(mages) {
    const container = document.getElementById('reports');
    container.innerHTML = '';
    
    mages.forEach(mageData => {
      let spellcaster;
      let roleClass = '';
      
      switch (mageData.role.toLowerCase()) {
        case 'apprentice':
          spellcaster = new Apprentice(mageData.name, mageData.element);
          roleClass = 'from-blue-400 to-blue-600';
          break;
        case 'mage':
          spellcaster = new Mage(mageData.name, mageData.element);
          roleClass = 'from-purple-400 to-purple-600';
          break;
        case 'archmage':
          spellcaster = new Archmage(mageData.name, mageData.element);
          roleClass = 'from-pink-400 to-pink-600';
          break;
      }

      const spellPower = spellcaster.getSpellPower();
      const spellResult = spellcaster.castSpell();
      const familiars = spellcaster.summonFamiliar();

      const card = document.createElement('div');
      card.className = 'bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-pink-500/20 transform transition-all duration-300 hover:scale-105';
      card.innerHTML = `
        <div class="mb-4">
          <h3 class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${roleClass}">
            ${spellcaster.name}
          </h3>
          <p class="text-gray-400">${spellcaster.element} Element</p>
        </div>
        <div class="space-y-3">
          <p class="text-pink-300 text-sm">
            Spell Power: ${spellPower}
          </p>
          <p class="text-yellow-300 text-sm">
            Cast Power: ${spellResult.power}
          </p>
          <p class="text-blue-300 text-sm">
            Familiars: ${familiars.join(', ')}
          </p>
        </div>
      `;
      
      container.appendChild(card);
    });
  }