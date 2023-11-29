module.exports = window.onLoad() => {
		const fragment = new URLSearchParams(window.location.hash.slice(1));
        console.log(fragment);

		const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

        //if an accessToken isn't present in the page URL,
        //change the style of the Discord Oauth link to be visible instead of none
        //so the user can access the Oauth page at Discord
		if (!accessToken) {
			return (document.getElementById('login').style.display = 'block');
		}


        //ping the Discord API to fetch user data
        //with the appropriate accessToken and tokenType passed back from 
        //the OAuth redirect in the URL
		fetch('https://discord.com/api/users/@me', {
			headers: {
				authorization: `${tokenType} ${accessToken}`,
			},
		})
        //if the accessToken is legit and associated with a real user
			.then(result => result.json())
			.then(response => {
                //parse the response into a username#discriminator
                //eg jumnhy#3337 
                //string and store that in
                //the "info" element's innertext
				const { username, discriminator } = response;
				document.getElementById('info').innerText += ` ${username}#${discriminator}`;
			})
			.catch(console.error);
	};