

//listen for auth status changes
auth.onAuthStateChanged(user => {

	if(user){
		console.log("user logged in ", user)
		// get data
		db.collection('players').onSnapshot(snapshot => {
			setupPlayers(snapshot.docs)
			setupUI(user);
		}, err => {
			console.log(err.message);
		});
			
		

	} else {
		setupUI();
		setupPlayers([]);
		
		console.log("user logged out");	
	}
	
});

// create new player
const createForm = document.querySelector("#create-form");

createForm.addEventListener('submit', (e) => {
	e.preventDefault();

	db.collection('players').add({
		first_name: createForm['first_name'].value,
		last_name: createForm['last_name'].value,
		mob: createForm['mob'].value,
		yob: createForm['yob'].value,
		// contact: createForm['contact'].value,
		gender: createForm['gender'].value
	}).then( () => {
		//close modal and reset the form for later
		const modal = document.querySelector('#modal-create');
		M.Modal.getInstance(modal).close();
		createForm.reset();
	}).catch( err => {
		console.log(err.message);
	});

});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {

	e.preventDefault();
	
	// get signup info
	const email = signupForm['signup-email'].value;
	const password = signupForm['signup-password'].value;

	// signup with the user info
	auth.createUserWithEmailAndPassword(email, password).then(cred => {
		//console.log( cred );
		const modal = document.querySelector('#modal-signup');
		M.Modal.getInstance(modal).close();

		signupForm.reset();

	});

	// console.log(email + " -  " + password);
});

// sign out
const logout = document.querySelector("#logout");
logout.addEventListener('click', (e) => { 
	e.preventDefault();
	auth.signOut();

});




//login form
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const email = loginForm['login-email'].value;
	const password = loginForm['login-password'].value;

	auth.signInWithEmailAndPassword(email, password).then(cred => {
		
		// console.log(cred.user);
		const modal = document.querySelector('#modal-login');
		M.Modal.getInstance(modal).close();

		loginForm.reset();

	});


});
