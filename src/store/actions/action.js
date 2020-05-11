export const asyncFetchRepos = (val)=>{
	return { type: "FETCH_REPOS", value: val }
}

export const getRepos = (val)=>{
	debugger;
	let url= '';
	console.log('environment', process.env.NODE_ENV)
	if(process.env.NODE_ENV === "production"){
		url= `${process.env.REACT_APP_AC_ORIGIN_GITHUB}/users/mojombo/repos`;
	}else{
		url= `${process.env.REACT_APP_AC_ORIGIN_GITHUB}/users/mojombo/repos`;
	}
	return dispatch =>{
		var myRepo = [];
		(function myFunc(url){
			fetch(`https://cors-anywhere.herokuapp.com/${url}`,{
				method: 'GET',
				headers: {
					'content-type': 'application/json',
				  }
			})
			.then(response => {
				response.json().then(data=>{
					console.log(response.headers.get('Link'));
					myRepo.push(...data);
					let nextURL = '';
					const link = response.headers.get('Link').split(',');

					for(let i of link){
						if(i.includes('next')){
							nextURL = i.split(';')[0].replace(/[<>]/g,'');;
							break;
						}
					}
					// var nextURL = response.headers.get('Link').split(',')[0].split(';')[0].replace('<', "").replace('>',"");
					if(nextURL && nextURL.length>0){
						myFunc(nextURL.trim());
					}else{
						console.log(myRepo);
						dispatch(asyncFetchRepos(myRepo)); 
						return
					}
					
				})
			})
		})(url);
	}
}