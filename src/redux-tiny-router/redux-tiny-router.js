var qs = require('query-string');
import * as actions from '../actions/actions.js'

export function init (store) {
  //  console.log(url.substring(url.indexOf(location)));
   // var location = window.location.pathname + window.location.search;
   // store.dispatch(actions.handleHashChange(location));
    window.onpopstate = function(data){
        console.log('window on popState');
        var location = window.location.pathname + window.location.search;

        store.dispatch(actions.handleHashChange(location));
    };
    //todo add hash option
/*    window.addEventListener('hashchange', function(data){
        console.log('hash change');
        console.log(data);
    });*/
}

export function initUniversal (url,createStore){

    return new Promise ((resolve,reject) =>{

        let store = createStore({},'http://'+url);
        var state = {};
        store.dispatch(actions.handleHashChange(url.substring(url.indexOf('/'))));
     //   resolve({state,store});
        var  unsubscribe = store.subscribe(function(){
          //  console.log('nerver heppened!');
            unsubscribe();
            state =  store.getState();
            store = createStore(state,'http://'+url);
            resolve({state,store});
        });

    });

}
