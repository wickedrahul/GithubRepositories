import axios from "axios";
var parseString = require('xml2js').parseString;
var xml;

export const onSearchAsync = (val)=>{
	return { type: "FIRE_SEARCH", value: val }
}

export const filtrRepostories = (val)=>{
	return { type: "FILTER_REPOS", value: val }
}

export const sortStarGazersOfRepo = (val)=>{
	return { type: "SORT_STAR_GAZERS", value: val}
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
		var ctr = 1;
		var myRepo = [];
		(function myFunc(url){
			fetch(url,{
				method: 'GET',
				headers: {
					'content-type': 'application/json',
					'Authorization': 'token 1ea1c175a6b1f5a2d11222bdba476cf2ab8cb413',
				  }
			})
			.then(response => {
				response.json().then(data=>{
					console.log(response.headers.get('Link'));
					myRepo.push(...data);
					var nextURL = '';
					response.headers.get('Link').split(',').map(i=> {
						if(i.includes('next')){
							nextURL = i.split(';')[0].replace("<","").replace(">","");
						}

					})
					// var nextURL = response.headers.get('Link').split(',')[0].split(';')[0].replace('<', "").replace('>',"");
					ctr =  ctr+1;
					if(nextURL && nextURL.length>0){
						myFunc("https://cors-anywhere.herokuapp.com/"+nextURL.trim());
					}else{
						console.log(myRepo);
						dispatch(onSearchAsync(myRepo)); 
						// else dispatch()
					}
					
				})
			})
		})("https://cors-anywhere.herokuapp.com/"+url);
		
	}
}

export const filterRepos = (val) =>{
	return dispatch =>{
		dispatch(filtrRepostories(val));
	}
}

export const sortStarGazers = (val) =>{
	return dispatch =>{
		dispatch(sortStarGazersOfRepo(val));
	}
}