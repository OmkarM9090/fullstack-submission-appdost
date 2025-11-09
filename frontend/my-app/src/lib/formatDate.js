import { formatDistanceToNow } from 'date-fns';

export const formatDate = (dateString) => {
    try {
        return formatDistanceToNow(new Date(dateString)) + ' ago';
    } catch (error) {
        return "just now";
    }
};