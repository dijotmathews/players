

//listen for auth status changes
auth.onAuthStateChanged(user => {

	if(user){
		console.log("user logged in ", user)
		// get data
		db.collection('players').get().then(snapshot => {
			setupPlayers(snapshot.docs)
			setupUI(user);
		});

	} else {
		setupUI();
		setupPlayers([]);
		
		console.log("user logged out");	
	}
	
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

	console.log(email + " -  " + password);
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
