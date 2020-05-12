export const asyncFetchRepos = (val)=>{
	return { type: "FETCH_REPOS", value: val }
}

export const getRepos = (val)=>{
	let url= '';
	console.log('environment', process.env.NODE_ENV)
	if(process.env.NODE_ENV === "production"){
		url= `${process.env.REACT_APP_AC_ORIGIN_GITHUB}/users/mojombo/repos`;
		//We can modify this to fetch repos of any user given as input instead of 'mojombo'
	}else{
		//Add proxy or change URLs if required on the basis of env
		url= `${process.env.REACT_APP_AC_ORIGIN_GITHUB}/users/mojombo/repos`;
	}
	return dispatch =>{
		var myRepo = [];
		(function myFunc(url){
			fetch(`https://cors-anywhere.herokuapp.com/${url}`,{  //Appended a proxy url to avoid CORS issues
				method: 'GET',
				headers: {
					'content-type': 'application/json'
				  }
			})
			.then(response => {
				response.json().then(data=>{
					myRepo.push(...data);
					let nextURL = '';
					const link = response.headers.get('Link').split(',');

					for(let i of link){
						if(i.includes('next')){
							nextURL = i.split(';')[0].replace(/[<>]/g,'');;
							break;
						}
					}
					if(nextURL && nextURL.length>0){
						myFunc(nextURL.trim()); //Call the same function recursively to fetch the next batch of data
					}else{
						dispatch(asyncFetchRepos(myRepo)); 
						return
					}
					
				})
			})
		})(url);
	}
}