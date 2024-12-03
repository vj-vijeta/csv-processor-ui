// Abstract Service Interface
class UserService {
  performAction(user) {
    throw new Error("Method must be implemented");
  }
}

// Concrete Service Implementation
class StudentService extends UserService {
  performAction(user) {
    return `${user.name} is studying ${user.course}`;
  }
}

class TeacherService extends UserService {
  performAction(user) {
    return `${user.name} is teaching ${user.course}`;
  }
}

// User class depending on abstraction
class User {
  constructor(name, email, role, course, service) {
    this.name = name;
    this.email = email;
    this.role = role;
    this.course = course;
    this.service = service;
  }

  doAction() {
    return this.service.performAction(this);
  }
}

function processCSV() {
  const file = document.getElementById('csvFile').files[0];
  if (!file) {
    alert('Please upload a CSV file');
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
    const service = userData.role.toLowerCase() === 'student' 
      ? new StudentService() 
      : new TeacherService();
      
    const user = new User(
      userData.name,
      userData.email,
      userData.role,
      userData.course,
      service
    );

    const action = user.doAction();
    
    const card = document.createElement('div');
    card.className = `bg-white p-6 rounded-lg shadow-lg border-l-4 ${
      user.role.toLowerCase() === 'student' ? 'border-blue-500' : 'border-green-500'
    }`;
    
    card.innerHTML = `
      <div class="flex justify-between items-start mb-4">
        <h3 class="text-xl font-semibold text-gray-800">${user.name}</h3>
        <span class="px-3 py-1 rounded-full text-sm ${
          user.role.toLowerCase() === 'student' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-green-100 text-green-800'
        }">${user.role}</span>
      </div>
      <div class="text-gray-600 space-y-2">
        <p><span class="font-medium">Email:</span> ${user.email}</p>
        <p><span class="font-medium">Course:</span> ${user.course}</p>
        <p class="text-indigo-600 italic">${action}</p>
      </div>
    `;
    
    container.appendChild(card);
  });
}