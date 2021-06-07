export const deleteNotification = (notifications,idToDelete)=>{
    console.log('deleting notification from state');

    const index = notifications.findIndex((notification)=>notification.notifID===idToDelete)
    const t = [
        ...notifications.splice(0,index),
        ...notifications.splice(index+1)
    ]
    console.log(t);
    if (index>-1){
        return [
            ...notifications.splice(0,index),
            ...notifications.splice(index+1)
        ]
    }
}