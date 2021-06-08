export const deleteNotification = (notifications,idToDelete)=>{
    console.log('notifs before deleting \n',notifications);
    console.log('deleting notification from state');

    const index = notifications.findIndex((notification)=>notification.notifID===idToDelete)
    console.log('found id to delete at index: ',index);
    const t = [
        ...notifications.splice(0,index),
        ...notifications.splice(index+1)
    ]
    console.log('the list of notifs with the one deleted');
    console.log(t);
    if (index>-1){
        return [
            ...notifications.splice(0,index),
            ...notifications.splice(index+1)
        ]
    }
}