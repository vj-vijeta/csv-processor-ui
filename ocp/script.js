 // Base classes for extensibility
 class DataProcessor {
    process(data) { throw new Error('Not implemented'); }
  }

  class DisplayStrategy {
    createCard(item) { throw new Error('Not implemented'); }
  }

  // Concrete implementations
  class CSVProcessor extends DataProcessor {
    process(file) {
      return new Promise((resolve) => {
        Papa.parse(file, {
          header: true,
          complete: (results) => resolve(results.data)
        });
      });
    }
  }

  class MagicCardDisplay extends DisplayStrategy {
    createCard(item) {
      return `
        <div class="card">
          <h3>${item.name || 'Unknown'}</h3>
          <p>Magic flows through ${item.type || 'unknown magic'}</p>
        </div>
      `;
    }
  }

  // UI Manager (follows OCP by accepting any DataProcessor and DisplayStrategy)
  class PortalManager {
    constructor(processor, display) {
      this.processor = processor;
      this.display = display;
      this.data = null;
      this.setupUI();
    }

    setupUI() {
      const fileInput = document.getElementById('csvFile');
      const castBtn = document.getElementById('castBtn');
      const clearBtn = document.getElementById('clearBtn');
      const status = document.getElementById('status');

      fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        status.textContent = 'Processing...';
        this.data = await this.processor.process(file);
        status.textContent = 'Portal ready!';
        castBtn.disabled = false;
        clearBtn.disabled = false;
      });

      castBtn.addEventListener('click', () => this.displayData());
      clearBtn.addEventListener('click', () => this.clearPortal());
    }

    displayData() {
      if (!this.data) return;
      const grid = document.getElementById('grid');
      grid.innerHTML = this.data.map(item => 
        this.display.createCard(item)
      ).join('');
    }

    clearPortal() {
      document.getElementById('grid').innerHTML = '';
      document.getElementById('status').textContent = '';
      document.getElementById('csvFile').value = '';
      document.getElementById('castBtn').disabled = true;
      document.getElementById('clearBtn').disabled = true;
      this.data = null;
    }
  }

  // Initialize
  const portalManager = new PortalManager(
    new CSVProcessor(),
    new MagicCardDisplay()
  );