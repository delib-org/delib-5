export async function getUserPermissionToNotifications(): Promise<boolean> {
    try {
        //@ts-ignore
        if (!"Notification" in window) throw new Error("Notification not supported");
        if (Notification.permission === "granted") return true;
        if (Notification.permission === "denied") throw new Error("Permission denied");

        const permission = await Notification.requestPermission();
        if (permission !== "granted") throw new Error("Permission not granted");
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}