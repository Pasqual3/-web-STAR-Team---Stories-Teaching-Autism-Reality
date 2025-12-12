import { userModel } from "../models/userSChema.js";


export const getUserData = async (req, res) => {
    try {
        const userId = req.userId;

        // TEMPORARY: Read from mock JSON file
        const fs = await import('fs');
        const path = await import('path');
        const { fileURLToPath } = await import('url');
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const mockPath = path.join(__dirname, '..', 'mockUsers.json');
        const mockUsers = JSON.parse(fs.readFileSync(mockPath, 'utf-8'));

        const user = mockUsers.find(u => u._id === userId);

        if (!user) {
            return res.json({ success: false, message: "User not Found" });
        }

        res.json({
            success: true,
            userData: {
                name: user.name,
                email: user.email,
                isAccountVerified: user.isAccountVerified,
                role: user.role
            }
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}