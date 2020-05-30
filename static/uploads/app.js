const pusher = new Pusher('ec641cc6d6a324fee3e3', {
    cluster: 'ap2',
    encrypted: true,
    authEndpoint: '/api/customer/messaging/pusher/auth'
});
const app = new Vue({
    el: '#app',
    data: {
        joined: false,
        username: '',
        members: '',
        newMessage: '',
        messages: [],
        status: ''
    },
    methods: {
        joinChat() {
            axios.post('/api/customer/messaging/join-chat', {username: this.username})
                .then(response => {
                    // User has joined the chat
                    this.joined = true;
                    const channel = pusher.subscribe("123");
                    channel.bind('pusher:subscription_succeeded', (members) => {
                        this.members = channel.members;
                    });
                    // User joins chat
                    channel.bind('pusher:member_added', (member) => {
                        this.status = `${member.id} joined the chat`;
                    });
                    // Listen for chat messages
                    this.listen();
                });
        },
        sendMessage() {
            let message = {
                username: this.username,
                message: this.newMessage
            }
            // Clear input field
            this.newMessage = '';
            axios.post('/api/customer/messaging/send-message', message);
        },
        listen() {
            const channel = pusher.subscribe("123");
            channel.bind('message_sent', (data) => {
                this.messages.push({
                    username: data.username,
                    message: data.message
                });
            });
        }
    }
});