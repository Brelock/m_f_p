import { Notification } from 'element-ui';

export default function({store, redirect, app}) {
  if (!store.state.auth.isAuthenticated) {
  	// console.log('middleware') 
  	
  	Notification.warning({
  		title: 'Доступ ограничен!',
  		message:'Эта страница доступна только авторизированным пользователям'
  	});

    return redirect('/');
  }
}