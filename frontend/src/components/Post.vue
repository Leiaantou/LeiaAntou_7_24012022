<template>
  <div>
    <CreatePost class="pb-0" />
    <ModalePost :revelePost="revelePost" :post="post" :toggleModalePost="toggleModalePost"></ModalePost>
    <ModaleComment :reveleComment="reveleComment" :comment="comment" :toggleModaleComment="toggleModaleComment"></ModaleComment>
    <article rows="7"
      class="jumbotron post pt-3 pb-2"
      v-for="post in allPosts"
      v-bind:key="post.id"
    >
      <div class="post-user d-flex align-items-baseline">
        <div>
          <img
            class="post_user_avatar mr-2"
            :src="require(`../../../backend/images/users/${post.User.avatar}`)"
          />
        </div>
        <div class="d-flex flex-column">
          <h4>{{ post.User.lastName }} {{ post.User.firstName }}</h4>
          <p class="createdAt">
            créé le
            {{
              post.createdAt.split("T")[0].split("-").reverse().join("/") +
              " à " +
              post.createdAt.split("T")[1].split(":").slice(0, -1).join(":")
            }}
          </p>
        </div>
      </div>
      <div class="post_container">
      <div class="post_content">{{ post.content }}</div>
      <div v-if="post.image" class="d-flex justify-content-center">
        <img
          class="post_image"
          :src="require(`../../../backend/images/posts/${post.image}`)"
        />
      </div>
      </div>
      <!-- si c'est l'user qui a publié -->
      <div class="d-flex justify-content-end mt-3">
      
        
        <button class="btn btn-info mr-2" v-if="userData.data.userId == post.User_id" v-on:click="toggleModalePost(post)">
          <fa icon="pencil" />
        </button>
        <button class="btn btn-danger" v-if="userData.data.userId == post.User_id" @click="deletePost(post.id)">
          <fa icon="trash-can" />
        </button>
        <button class="btn btn-info ml-2" @click="commentForm = !commentForm">
          <fa icon="comment" />
        </button>
        <button class="btn btn-info ml-2"><fa icon="thumbs-up" /></button>
      </div>
      <div v-show="commentForm" class="commentForm">
        <form>
          <div class="form-group mb-0">
            <label for="content"></label>
            <input
              type="text"
              id="content"
              name="content"
              v-model="this.comment.content"
              class="form-control"
            />
          </div>
          <div class="form-group mt-0">
            <label for="commentImage"></label>
            <input
              name="image"
              id="CommentImage"
              type="file"
              class="form-control"
              accept="image/png, image/jpeg, image/jpg, image/gif"
              @change="onFileSelected"
            />
            <div class="d-flex justify-content-end">
              <button
                class="btn btn-info mt-1"
                type="submit"
                @click.prevent="createComment(post.id)"
              >
                <fa icon="paper-plane" />
              </button>
            </div>
          </div>
          <span id="msgError" class="mx-3 text-danger">{{ msgError }}</span>
        </form>
      </div>
      <!-- Affichage des commentaires -->
      <h5 v-if="post.Comments.length > 0">Commentaires:</h5>
      <div class="comment mt-3" v-if="post.Comments.length >= 1">
        <div v-for="comment in post.Comments" v-bind:key="comment.id">
          <div class="comment_user d-flex flex-row align-items-baseline">
            <div>
              <img
                class="comment_user_avatar mr-2"
                v-if="comment.User.avatar != null"
                :src="
                  require(`../../../backend/images/users/${comment.User.avatar}`)
                "
              />
              <img
                class="comment_user_avatar mr-2"
                v-else
                src="../assets/avatar.png"
              />
            </div>
            <div class="bulle">
              <h6 class="d-flex flex-column">{{ comment.User.lastName }} {{ comment.User.firstName }}</h6>

            
          
          <div class="comment_content">{{ comment.content }}</div>
          <div class="d-flex justify-content-center" v-if="comment.image" >
            <img 
              class="comment_image"
              :src="
                require(`../../../backend/images/comments/${comment.image}`)
              "
            />
            </div>
          </div>
        </div>
                        <p class="createdAt font-italic">
                créé le
                {{
                  comment.createdAt
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("/") +
                  " à " +
                  comment.createdAt
                    .split("T")[1]
                    .split(":")
                    .slice(0, -1)
                    .join(":")
                }}
              </p>
          <div class="d-flex justify-content-end mt-3">
            <button class="button_comment btn btn-info btn-sm mr-2" v-if="userData.data.userId == comment.User_id" v-on:click="toggleModaleComment(comment)">
              <fa icon="pencil" />
            </button>
            <button
              class="button_comment btn btn-danger btn-sm mr-2" v-if="userData.data.userId == comment.User_id"
              @click="deleteComment(comment.id)"
            >
              <fa icon="trash-can" />
            </button>
            <!-- <button class="btn btn-info"><fa icon="thumbs-up" /></button> -->
          </div>
        
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import axios from "axios";
import CreatePost from "../components/CreatePost.vue";
import ModalePost from "../components/ModalePost.vue";
import ModaleComment from "../components/ModaleComment.vue";

export default {
  name: "Post",
  components: {
    CreatePost,
    ModalePost,
    ModaleComment
  },
  data() {
    return {
      reveleComment: false,
      revelePost: false,
      commentForm: false,
      userData: { data: {} },
      user: {
        lastName: "",
        firstName: "",
        avatar: "",
        userId: "",
      },
      post: {
        id: "",
        content: "",
        image: "",
        userId: "",
        createdAt: "",
        updatedAt:""
      },

      comment: {
        id: "",
        content: "",
        image: "",
        userId: "",
        createdAt: "",
        postId: "",
        updatedAt:""
      },

      allPosts: [],
      allComments: [],
      msgError: "",
    };
  },

  mounted() {
    this.getAllPosts();
    this.createUserData();
  },

  methods: {
    getAllPosts() {
      axios
        .get("http://localhost:3000/api/post/")
        .then((response) => {
          if (response.data.length > 0) {
            this.allPosts = response.data;
            console.log(response);
          } else {
            console.log("Il n'y a pas encore de publication.");
          }
        })
        .catch((error) =>
          console.log(error + "Echec lors de la récupération des publications.")
        );
    },
    createUserData() {
      if (localStorage.getItem("user")) {
        try {
          this.userData = JSON.parse(localStorage.getItem("user"));
        } catch (e) {
          localStorage.removeItem("user");
          console.log("Données corrompues");
        }
      }
    },
    toggleModalePost(post) {
      this.post = post;
      this.revelePost = !this.revelePost;
    },
    toggleModaleComment(comment) {
      this.comment = comment;
      this.reveleComment = !this.reveleComment;
    },
    modifyPost() {},
    deletePost(postId) {
      axios
        .delete("http://localhost:3000/api/post/" + postId, {
          headers: {
            Authorization: `Bearer: ${this.userData.data.token}`,
          },
        })
        .then(() => {
          location.reload();
        })
        .catch((error) => console.log(error));
    },

    onFileSelected(event) {
      console.log(event);
      this.comment.image = event.target.files[0] || event.dataTransfer.files;
      console.log(this.comment.image);
    },
    createComment(postId) {
      console.log(postId);
      const fd = new FormData();
      fd.append("content", this.comment.content);
      fd.append("Post_id", postId);
      fd.append("image", this.comment.image);

      console.log("test", fd.get("content"));
      console.log("test", fd.get("image"));
      console.log("test", fd.get("Post_id"));
      if (
        (fd.get("content") == null && fd.get("image") == null) ||
        (fd.get("content") == "" && fd.get("image") == "")
      ) {
        let msgReturn = document.getElementById("msgError");
        msgReturn.classList.add("text-danger");
        this.msgError = "Rien à publier";
      } else {
        axios
          .post("http://localhost:3000/api/comment/", fd, {
            headers: {
              Authorization: `Bearer: ${this.userData.data.token}`,
            },
          })
          .then(() => {
            this.comment.content = "";
            this.comment.image = "";
            location.reload();
          })
          .catch((error) => console.log(error));
      }
    },

    modifyComment() {},
    deleteComment(commentId) {
      axios
        .delete("http://localhost:3000/api/comment/" + commentId, {
          headers: {
            Authorization: `Bearer: ${this.userData.data.token}`,
          },
        })
        .then(() => {
          location.reload();
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
.post_user_avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px double #034E6F;
   object-fit: cover;
}

.comment_user_avatar {
    width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px double white;
  object-fit: cover;
}

.post_image {
  object-fit: contain;
  width: 50%;
}

.comment_image {
  width: 30%;
}

.icon {
  color: black;
}

/* .post {
  background-color: #0582ba;
} */
/* .post_container{
  background-color: bisque;
  } */
  .post_content{
    font-size: 20px;
  }
.bulle {
    background-color: #034E6F;
    border-radius: 20px;
    padding: 15px;
    border: 2px solid white;
    color: white;
}
.comment_content{
  font-size: 20px;
}
p.createdAt {
    font-size: 10px;
    text-align: end;
    margin-top: -8px;
}
.btn-info{
  background-color: #034E6F;
}
</style>
