window.onload=function(){
	new Vue({
	  el: "#app",
	  data: {
		loaded: false,
		chat:  [
			{
			id: 1,
			fromId: 1,
			toId: 1,
			timeStamp: new Date(new Date().getTime()).toLocaleTimeString(),
			messageText: "Welcome, choose a frog to chat with.",
			isRead: false
			}
		],
		chats: [
			{
				id: 1,
				fromId: 1,
				toId: 2,
				timeStamp: new Date(new Date().getTime() - 60*1000).toLocaleTimeString(),
				messageText: "Froggos have a little joke, that the world is so hard a man must have\ntwo fathers to look after him, and that's why they have God Froggers",
				isRead: false
			},
			{
				id: 2,
				fromId: 1,
				toId: 3,
				timeStamp: new Date(new Date().getTime() - 10*1000).toLocaleTimeString(),
				messageText: "Fredo, I need you make a deal with the Toad King.",
				isRead: false
			},
			{
				id: 1,
				fromId: 2,
				toId: 2,
				timeStamp: new Date(new Date().getTime() - 2*1000).toLocaleTimeString(),
				messageText: "The froggo with the long tongue can steal more flies than the man with the gun ",
				isRead: false
			},
			{
				id: 2,
				fromId: 3,
				toId: 3,
				timeStamp: new Date(new Date().getTime() - 1000).toLocaleTimeString(),
				messageText: "I'll make him an offer he can't refuse.",
				isRead: false
			},		
		
		],
		frogs: [
			{
				id: 1,
				name: "Vito Croakleone",
				isHenchmen: false,
				avitar: "frog-avi.jpg",
				online: true,
				inchat: true,
				messageCount: 0
			},
			{
				id: 2,
				name: "Sonny",
				isHenchmen: true,
				avitar: "frog-avi-1.jpg",
				online: true,
				inchat: false,
				messageCount: 0
			},
			{
				id: 3,
				name: "Fredo",
				isHenchmen: true,
				avitar: "frog-avi-2.jpg",
				online: true,
				inchat: false,
				messageCount: 0
			},
			{
				id: 4,
				name: "Michael",
				isHenchmen: true,
				avitar: "frog-avi-3.jpg",
				online: false,
				inchat: false,
				messageCount: 0
			}
		],
		chatting: 
			{
				id: 1,
				name: "Vito Croakleone",
				isHenchmen: false,
				avitar: "frog-avi.jpg",
				online: true,
				inchat: true,
				messageCount: 0
			}
	  },
	  methods: {
		init: function () {
			var element = document.getElementById("bootstrap");
			element.classList.remove("wait");
			element.classList.add("loaded");
			this.scrollChat();
			this.loaded = true;
			this.chatting.messageCount = this.chats.length;
		},
		chatWith: function(thisFrog) {
			document.getElementById("typing").value = "";
			this.chat = this.chats.filter((item) => item.toId === thisFrog.id);
			this.frogs.forEach((frog) => {
				if (thisFrog.id===frog.id) {
					frog.inchat=true;
					this.chatting=frog;
					frog.messageCount = this.chat.length;
				} else {
					frog.inchat=false;
				}
			})
			this.scrollChat();
			let self = this;
			setTimeout(function(){
					self.scrollChat();
				}, 20); // after nexttick
			setTimeout(function(){
					self.scrollChat();
				}, 100); // slower machines
		},
		
		scrollChat: function() {
			let chatBox = document.getElementById("chatbox");
			chatBox.scrollTop = chatBox.scrollHeight;
			document.getElementById("typing").focus();
		}, 
		keymonitor: function(event) {
			console.log(event.key);
			if(event.key == "Enter" && !event.shiftKey){
				this.pushChatText();
			}
		},
		pushChatText: function() {
			if (this.chatting.id !== this.me.id) {
				let saying = {
					id: this.chats.length +1,
					fromId: this.me.id,
					toId: this.chatting.id,
					timeStamp: new Date(new Date().getTime()).toLocaleTimeString(),
					messageText: document.getElementById("typing").value,
					isRead: false
				}
				document.getElementById("typing").value = "";
				if (saying.messageText.length >= 1) {
					this.chats.push(saying);
				}
				this.chatWith(this.chatting);
			} else {
				this.chat[0].messageText = "You must select a frog to message first."
			}
		}
	  },
	  computed: {
			henchmen: function() {
				return this.frogs.filter(function(u) {
					return u.isHenchmen
				});
			},
			me: function() {
				return this.frogs.filter(function(u) {
					return !u.isHenchmen
				}).shift();
			}
		},
		mounted(){
			this.init();
		 }	
	})
}