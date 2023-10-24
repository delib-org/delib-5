export async function getUserPermissionToNotifications(): Promise<boolean> {
    try {
       
        if (!("Notification" in window)) throw new Error("Notification not supported");
        if (Notification.permission === "granted") return true;
        if (Notification.permission === "denied") {
            console.log('permission denied')
            const permission = await Notification.requestPermission();
            if (permission !== "granted") throw new Error("Permission not granted");
            return true;
        }

        const permission = await Notification.requestPermission();
        if (permission !== "granted") throw new Error("Permission not granted");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}