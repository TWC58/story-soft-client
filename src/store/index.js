import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../api'
import AuthContext from '../auth'
import { useEffect } from 'react';
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});

export const ListViewMode = {
    MY_LISTS: "MY_LISTS",
    USER_LISTS: "USER_LISTS",
    PUBLISHED_LISTS: "PUBLISHED_LISTS",
    COMMUNITY_LISTS: "COMMUNITY_LISTS"
}

export const ListSortMode = {
    DATE_NEWEST: "DATE_NEWEST",
    DATE_OLDEST: "DATE_OLDEST",
    VIEWS: "VIEWS",
    LIKES: "LIKES",
    DISLIKES: "DISLIKES"
}

export const SearchBy = {
    TITLE: "TITLE",
    AUTHOR: "AUTHOR",
    TAG: "TAG"
}

export const MediaType = {
    COMIC: "COMIC",
    STORY: "STORY"
}

export const LikeType = {
    LIKE: "LIKE",
    DISLIKE: "DISLIKE"
}

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    SET_CURRENT_POST: "SET_CURRENT_POST",
    SET_EXPLORE_POSTS: "SET_EXPLORE_POSTS",
    SET_FOLLOWING_POSTS: "SET_FOLLOWING_POSTS",
    MARK_POST_FOR_DELETION: "MARK_POST_FOR_DELETION",
    UNMARK_POST_FOR_DELETION: "UNMARK_POST_FOR_DELETION",
    MARK_SECTION_FOR_DELETION: "MARK_SECTION_FOR_DELETION",
    UNMARK_SECTION_FOR_DELETION: "UNMARK_SECTION_FOR_DELETION",
    SET_EDIT_ACTIVE: "SET_EDIT_ACTIVE",
    SET_POST_VIEW_MODE: "SET_POST_VIEW_MODE",
    SET_MEDIA: "SET_MEDIA",
    GET_USER_INFO: "GET_USER_INFO",
    SET_SEARCH_POSTS: "SET_SEARCH_POSTS",
    SET_CURRENT_SECTION: "SET_CURRENT_SECTION",
    SET_FRONT_PAGE_DATA: "SET_FRONT_PAGE_DATA",
    SET_SEARCH_BY: "SET_SEARCH_BY",
    ADD_FOLLOWER: 'ADD_FOLLOWER',
    REMOVE_FOLLOWER: 'REMOVE_FOLLOWER',
    SET_USER_POSTS: 'SET_USER_POSTS',
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        mediaType: MediaType.STORY,
        explorePosts: [],
        followingPosts: [],
        searchPosts: null,
        userPosts: null,
        currentPost: null,
        postMarkedForDeletion: null,
        sectionMarkedForDeletion: null,
        postViewMode: null,
        profileInfo: null,
        tagPostArrays: null,
        searchBy: SearchBy.TITLE
    });
    const history = useHistory();

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        console.log("updating...");
    }, [store]);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case GlobalStoreActionType.SET_CURRENT_POST: {
                return setStore({
                    ...store,
                    mediaType: store.mediaType,
                    explorePosts: store.explorePosts,
                    followingPosts: store.followingPosts,
                    currentPost: payload.currentPost,
                    postMarkedForDeletion: store.postMarkedForDeletion,
                    postViewMode: store.postViewMode,
                    profileInfo: store.profileInfo,
                })
            }
            case GlobalStoreActionType.SET_MEDIA: {
                console.log("SET MEDIA to " + payload.mediaType);
                return setStore({
                    ...store,
                    mediaType: payload.mediaType,
                    explorePosts: store.explorePosts,
                    followingPosts: store.followingPosts,
                    currentPost: null,
                    postMarkedForDeletion: null,
                    postViewMode: null
                });
            }
            case GlobalStoreActionType.SET_EXPLORE_POSTS: {
                return setStore({
                    ...store,
                    mediaType: store.mediaType,
                    explorePosts: payload.explorePosts,
                    followingPosts: store.followingPosts,
                    currentPost: null,
                    postMarkedForDeletion: null,
                    postViewMode: null
                });
            }
            case GlobalStoreActionType.SET_FOLLOWING_POSTS: {
                return setStore({
                    ...store,
                    mediaType: store.mediaType,
                    explorePosts: store.explorePosts,
                    followingPosts: payload.followingPosts,
                    currentPost: null,
                    postMarkedForDeletion: null,
                    postViewMode: null
                });
            }
            case GlobalStoreActionType.SET_SEARCH_POSTS: {
                console.log("SETTING SEARCH POSTS", payload);
                return setStore({
                    ...store,
                    searchPosts: payload.searchPosts
                });
            }
            case GlobalStoreActionType.GET_USER_INFO: {
                return setStore({
                    ...store,
                    mediaType: store.mediaType,
                    explorePosts: store.explorePosts,
                    followingPosts: store.followingPosts,
                    currentPost: store.currentPost,
                    postMarkedForDeletion: store.postMarkedForDeletion,
                    postViewMode: store.postViewMode,
                    profileInfo: payload.profileInfo,
                })
            }
            case GlobalStoreActionType.MARK_POST_FOR_DELETION: {
                //console.log(payload);
                return setStore({
                    ...store,
                    postMarkedForDeletion: payload
                });
            }
            case GlobalStoreActionType.UNMARK_POST_FOR_DELETION: {
                console.log("UNMARKING POST");
                var currentPost = store.currentPost;
                if(payload.deletedPost) currentPost = null;
                return setStore({
                    ...store,
                    postMarkedForDeletion: null,
                    currentPost: currentPost
                });
            }
            case GlobalStoreActionType.MARK_SECTION_FOR_DELETION: {
                console.log("SETTING STORE TO DELETE SECTION: ", payload);
                return setStore({
                    ...store,
                    sectionMarkedForDeletion: payload
                });
            }
            case GlobalStoreActionType.UNMARK_SECTION_FOR_DELETION: {
                console.log("UNMARKING SECTION:", store.sectionMarkedForDeletion);
                var currentSection = store.sectionMarkedForDeletion;
                if(payload.deletedSection) currentSection = null;
                return setStore({
                    ...store,
                    sectionMarkedForDeletion: null
                });
            }
            case GlobalStoreActionType.SET_FRONT_PAGE_DATA: {
                return setStore({
                    ...store,
                    tagPostArrays: payload.tagPostArrays

                });
            }
            case GlobalStoreActionType.SET_SEARCH_BY: {
                return setStore({
                    ...store,
                    searchBy: payload.searchBy
                });
            }
            case GlobalStoreActionType.ADD_FOLLOWER: { //TODO ADD TO auth.user.following
                console.log(payload);                
                return setStore({
                    ...store,
                    profileInfo: { ...store.profileInfo, followers: store.profileInfo.followers.concat([payload.follower]) }
                });
            }
            case GlobalStoreActionType.REMOVE_FOLLOWER: { //TODO REMOVE FROM auth.user.following
                return setStore({
                    ...store,
                    profileInfo: { ...store.profileInfo, followers: removeItemAll(store.profileInfo.followers, payload.unfollower) }
                });
            }
            case GlobalStoreActionType.SET_USER_POSTS: {
                console.log("SETTING USER POSTS", payload);
                return setStore({
                    ...store,
                    userPosts: payload.userPosts
                });
            }
            default:
                return store;
        }
    }

    //HELPER FOR REMOVE FOLLOWERS

    function removeItemAll(arr, value) {
        var i = 0;
        while (i < arr.length) {
          if (arr[i] === value) {
            arr.splice(i, 1);
          } else {
            ++i;
          }
        }
        if(arr.length) return arr;
        return new Array();
      }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    store.pushToHistory = function(route) {
        history.push(route);
    }

    store.searchForPosts = async function(search) {
        let res = await api.getPosts(store.mediaType, {
            "search" : search,
            "searchBy" : store.searchBy
        }).catch((err) => {
            console.log(err);
        });

        if (res.status === 200) {
            storeReducer({
                type: GlobalStoreActionType.SET_SEARCH_POSTS,
                payload: {
                    searchPosts: res.data.data
                }
            });
        }
    }

    store.setSearchBy = function(searchBy) {
        storeReducer({
            type: GlobalStoreActionType.SET_SEARCH_BY,
            payload: {
                searchBy: searchBy
            }
        });
    }

    store.loadFrontPageData = async function() {
        let tagsRes = await api.getTags(store.mediaType).catch((err) => {
            console.log(err);
        });

        if (tagsRes.status === 200){
            //now we have the tags and need to create the list of posts for each
            const tags = tagsRes.data.tags;

            //this will hold the list of objects in the format the Explore page expects
            let tagPostArrays = [];

            for (let tag of tags) {
                //go through each tag and use an api call to search for posts by tag
                let postsByTagRes = await api.getPosts(store.mediaType, {
                    "search" : tag.name,
                    "searchBy" : "TAG"
                }).catch((err) => {
                    console.log(err);
                });

                //if success, store these posts with their name tag
                if (postsByTagRes.status === 200) {
                    console.log("POSTS FOR TAG " + tag.name + " " + JSON.stringify(postsByTagRes.data.data));
                    tagPostArrays.push({
                        name : tag.name,
                        posts : postsByTagRes.data.data
                    })
                }
            }

            //save the final product to the store
            storeReducer({
                type: GlobalStoreActionType.SET_FRONT_PAGE_DATA,
                payload: {
                    tagPostArrays: tagPostArrays
                }
            });
        }
    }

    //FOLLOWING/UNFOLLOWING
    store.followUser = async (follower, followed) => {
        let response = await api.followUser({ follower: follower, followed: followed }).catch((err) => {
            console.log("Error following user");
        });
        if(response.status === 200) {
            auth.addFollowed({ follower: follower, followed: followed })
            storeReducer({
                type: GlobalStoreActionType.ADD_FOLLOWER,
                payload: { follower: follower, followed: followed }
            });
        }
    };

    store.unfollowUser = async (unfollower, unfollowed) => {
        let response = await api.unfollowUser({ unfollower: unfollower, unfollowed: unfollowed }).catch((err) => {
            console.log("Error unfollowing user");
        });
        if(response.status === 200) {
            auth.removeFollowed({ unfollower: unfollower, unfollowed: unfollowed });
            storeReducer({
                type: GlobalStoreActionType.REMOVE_FOLLOWER,
                payload: { unfollower: unfollower, unfollowed: unfollowed }
            });
        }
    };

    //SECTIONS

    store.findLoadedSection = function(sectionId) {

        if (store.currentPost.loadedRoot._id === sectionId)
            return store.currentPost.loadedRoot;
        
        return store.findLoadedSectionHelper(store.currentPost.loadedRoot, sectionId);
        
    }

    store.findLoadedSectionHelper = function(section, sectionId) {
        if (!section)
            return null;

        console.log("HELPER looking for sectionId " + sectionId + ", currently on section " + section._id);

        for (let childSection of section.loadedChildren) {
            if (childSection._id === sectionId)
                return childSection;

            let result = store.findLoadedSectionHelper(childSection, sectionId);

            if (result)
                return result;
        }

        return null;
    }

    store.setCurrentSection = async function (sectionId) {
        console.log("SETTING SECTION", sectionId);
        let res = await api.getSection(sectionId).catch((err) => {
            console.log(err);
        });
        console.log(res);
        if(res.status === 200){
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_SECTION,
                payload: res.data.section
            });
        }
    }

    store.addSection = async function (parentSectionId) {
        let response = await api.addSection(parentSectionId).catch((err) => {
            console.log(err);
            if (err.response)
                auth.setError(err.response.errorMessage);
        });;

        if (response?.data.success) {
            let parentSection = store.findLoadedSection(parentSectionId);
            parentSection.children.push(response.data.section._id);
            parentSection.loadedChildren.push(response.data.section);
            response.data.section.loadedChildren = [];
            return response.data.section;//the new section created
        }
    }

    store.recursiveSectionBuilder = async function (rootSectionId) {
        console.log("Recursive section builder from root call")
        let response = await api.getSection(rootSectionId);

        if (response?.data.success) {
            let rootSection = response.data.section;
            await store.recursiveSectionBuilderHelper(rootSection);
            store.currentPost.loadedRoot = rootSection;
            return rootSection;
        }
        return null;
    }

    store.recursiveSectionBuilderHelper = async (section) => {
        console.log("Recursive section builder HELPER call for: " + JSON.stringify(section));
        section.loadedChildren = []

        if (!section)
            return;

        for (let child of section.children) {
            let response = await api.getSection(child);

            if (response?.data.success) {
                section.loadedChildren.push(response.data.section);
                store.recursiveSectionBuilderHelper(section.loadedChildren.slice(-1)[0]);
            }
        }
    }

    store.handleMediaSwitch = () => {
        console.log("Handle media switch start: " + store.mediaType);
        storeReducer({
            type: GlobalStoreActionType.SET_MEDIA,
            payload: {
                mediaType: (store.mediaType === MediaType.STORY) ? MediaType.COMIC : MediaType.STORY
            }
        });
        console.log("Handle media switch end: " + store.mediaType);
    }

    store.goHome = () => {
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_POST,
            payload: {
                currentPost: null
            }
        });
        history.push("/");
    }

    //POSTS
    store.createPost = async function () {
        let response = await api.createPost(this.mediaType).catch((err) => {
            console.log(err);
            if (err.response)
                auth.setError(err.response.errorMessage);
        });;

        if (response?.data.success) {
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_POST,
                payload: {
                    currentPost: response.data.post
                }
            });
            history.push("/post/" + response.data.post._id);
        }
    }

    store.updatePost = async function (post) {
        let response = await api.updatePost(store.mediaType, post._id, post).catch((err) => {
            console.log(err);
            if (err.response)
                auth.setError(err.response.errorMessage);
        });

        if (response?.data.success) {
            auth.setError("Post saved!");
        }
    }

    store.getPost = async function (postId) {
        let response = await api.getPost(store.mediaType, postId).catch((err) => {
            console.log(err);
            if (err.response)
                auth.setError(err.response.errorMessage);
        });
        //console.log(response);
        //console.log(response.data.post);
        if (response?.data.success) {
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_POST,
                payload: {
                    currentPost: response.data.post
                }
            });
        }
    }

    store.getSearchPosts = async function (search, searchBy) {
        let response = await api.getPosts(store.mediaType, { search: search, searchBy: searchBy }).catch((err) => {
            console.log(err);
            if (err.response)
                auth.setError(err.response.errorMessage);
        });
        console.log("USER POSTS: ", response.data);
        if (response.data.success) {
            console.log("SETTING POSTS: ", response.data.data);
            storeReducer({
                type: GlobalStoreActionType.SET_SEARCH_POSTS,
                payload: {
                    searchPosts: response.data.data
                }
            });
        }
    }

    store.getUserPosts = async function (search, searchBy) {
        let response = await api.getPosts(store.mediaType, { search: search, searchBy: searchBy }).catch((err) => {
            console.log(err);
            if (err.response)
                auth.setError(err.response.errorMessage);
        });
        console.log("USER POSTS: ", response.data);
        if (response.data.success) {
            console.log("SETTING POSTS: ", response.data.data);
            storeReducer({
                type: GlobalStoreActionType.SET_USER_POSTS,
                payload: {
                    userPosts: response.data.data
                }
            });
        }
    }

    store.viewCommunityList = async function (list) {
        let response = await api.viewCommunityList(list._id).catch((err) => {
            console.log(err);
            if (err.response)
                auth.setError(err.response.errorMessage);
        });
        if (response.data.success) {
            list.views = list.views + 1;
            return list;
        }
    }

    store.searchLists = (search) => {
        if (search === "") {
            return storeReducer({
                type: GlobalStoreActionType.SEARCH_LISTS,
                payload: {
                    lists: store.allLists,
                    search: ""
                }
            });
        }

        let searchedLists = store.allLists.filter((list) => {
            return list.name.toLowerCase().startsWith(search.toLowerCase());
        });

        storeReducer({
            type: GlobalStoreActionType.SEARCH_LISTS,
            payload: {
                lists: searchedLists,
                search: search
            }
        });
    }

    store.sortLists = (sortMode) => {
        let sortedLists = store.lists.sort((first, second) => {
            if (sortMode === ListSortMode.DATE_NEWEST) {
                let firstTime = (first.published) ? Date.parse(first.published) : Date.parse(first.createdAt);
                let secondTime = (second.published) ? Date.parse(second.published) : Date.parse(second.createdAt);
                return secondTime - firstTime;
            } else if (sortMode === ListSortMode.DATE_OLDEST) {
                let firstTime = (first.published) ? Date.parse(first.published) : Date.parse(first.createdAt);
                let secondTime = (second.published) ? Date.parse(second.published) : Date.parse(second.createdAt);

                return firstTime - secondTime;
            } else if (sortMode === ListSortMode.VIEWS) {
                return second.views - first.views;
            } else if (sortMode === ListSortMode.LIKES) {
                return second.likes - first.likes;
            } else if (sortMode === ListSortMode.DISLIKES) {
                return second.dislikes - first.dislikes;
            }
            return 1;
        });

        storeReducer({
            type: GlobalStoreActionType.SEARCH_LISTS,
            payload: {
                lists: sortedLists
            }
        });
    }

    store.likePost = async function (postId, like) {
        let response = await api.likePost(store.mediaType, postId, { like: like }).catch((err) => {
            console.log(err);
            if (err.response) {
                auth.setError("Like failed!");
                return;
            }
        });
        if (response.status === 200) {
            return true;
        }

        return false;
    }

    store.unlikeList = async function (list, like) {
        let lType = (store.listViewMode === ListViewMode.COMMUNITY_LISTS) ? "community" : "normal";
        let response = await api.unlikeList(list._id, { like: like, listType: lType }).catch((err) => {
            console.log(err);
            if (err.response) {
                auth.setError("Unlike failed!");
                return;
            }
        });
        if (response.data && response.data.success) {
            if (auth.user.likes) {//delete any existing like from the user's like list
                auth.user.likes.forEach((like, index) => {
                    if (like.listId === list._id) {
                        auth.user.likes.splice(index, 1);
                    }
                })
            }
            return response.data.top5List;
        }
    }

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = async function (id, newName) {
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            top5List.name = newName;
            async function updateList(top5List) {
                response = await api.updateTop5ListById(top5List._id, top5List);
                if (response.data.success) {
                    async function getListPairs(top5List) {
                        response = await api.getTop5ListPairs();
                        if (response.data.success) {
                            let pairsArray = response.data.idNamePairs;
                            storeReducer({
                                type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                payload: {
                                    idNamePairs: pairsArray,
                                    top5List: null//changed this to null so current list wasn't updated here, from top5List
                                }
                            });
                        }
                    }
                    getListPairs(top5List);
                }
            }
            updateList(top5List);
        }
    }


    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });

        // tps.clearAllTransactions();
        // history.push("/");//TODO bug when clicking logo from home screen
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let payload = {
            username: auth.user.username,
            name: "Untitled",
            items: ["?", "?", "?", "?", "?"],
            likes: 0,
            dislikes: 0,
            published: null,
            views: 0
        };
        const response = await api.createTop5List(payload);
        if (response.data.success) {
            // tps.clearAllTransactions();
            let newList = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            history.push("/top5list/" + newList._id);
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markPostForDeletion = async function (id) {
        //console.log(id);
        storeReducer({
            type: GlobalStoreActionType.MARK_POST_FOR_DELETION,
            payload: id
        });
    }

    store.markSectionForDeletion = async function (id) {
        console.log("SECTION BEING MARKED: ", id);
        storeReducer({
            type: GlobalStoreActionType.MARK_SECTION_FOR_DELETION,
            payload: id
        });
    }

    store.deletePost = async function (postToDelete) {
        let response = await api.deletePost(store.mediaType, postToDelete);
        if (response.data.success) {
            storeReducer({
                type: GlobalStoreActionType.UNMARK_POST_FOR_DELETION,
                payload: { deletedPost: postToDelete }
            });
        }
    }

    store.deleteSection = async function (sectionToDelete) {
        console.log(sectionToDelete);
        let response = await api.deleteSection(sectionToDelete).catch((err) => {
            console.log(err);
        });
        if (response?.data.success) {
            return storeReducer({
                type: GlobalStoreActionType.UNMARK_SECTION_FOR_DELETION,
                payload: { deletedSection: sectionToDelete }
            });
        }
    }

    store.deleteMarkedPost = function () {
        store.deletePost(store.postMarkedForDeletion);
    }

    store.deleteMarkedSection = async function () {
        return store.deleteSection(store.sectionMarkedForDeletion);
    }

    store.unmarkPostForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_POST_FOR_DELETION,
            payload: { deletedPost: null }
        });
    }

    store.unmarkSectionForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_SECTION_FOR_DELETION,
            payload: { deletedSection: null }
        });
    }

    store.initState = () => {
        let explorePosts = null; //TODO need to implement functionality to fetch these posts
        let followingPosts = null; //TODO need to implement functionality to fetch these posts

        storeReducer({
            type: GlobalStoreActionType.SET_EXPLORE_POSTS,
            payload: {
                explorePosts: explorePosts
            }
        });

        storeReducer({
            type: GlobalStoreActionType.SET_FOLLOWING_POSTS,
            payload: {
                followingPosts: followingPosts
            }
        });

    }

    store.addMoveItemTransaction = function (start, end) {
        // let transaction = new MoveItem_Transaction(store, start, end);
        // tps.addTransaction(transaction);
    }

    store.addUpdateItemTransaction = function (index, newText) {
        let oldText = store.currentList.items[index];
        // let transaction = new UpdateItem_Transaction(store, index, oldText, newText);
        // tps.addTransaction(transaction);
    }

    store.moveItem = function (start, end) {
        start -= 1;
        end -= 1;
        if (start < end) {
            let temp = store.currentList.items[start];
            for (let i = start; i < end; i++) {
                store.currentList.items[i] = store.currentList.items[i + 1];
            }
            store.currentList.items[end] = temp;
        }
        else if (start > end) {
            let temp = store.currentList.items[start];
            for (let i = start; i > end; i--) {
                store.currentList.items[i] = store.currentList.items[i - 1];
            }
            store.currentList.items[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }

    store.updateItem = function (index, newItem) {
        store.currentList.items[index] = newItem;
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_LIST,
            payload: store.currentList
        });
    }

    store.updateListName = function (newName) {
        store.currentList.name = newName;
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_LIST,
            payload: store.currentList
        });
    }

    store.updateCurrentList = async function () {
        const response = await api.updateTop5ListById(store.currentList._id, store.currentList);
        if (response.data.success) {
            store.loadMyLists();
        }
    }

    store.publishList = async function () {
        store.currentList.published = new Date(Date());
        const response = await api.updateTop5ListById(store.currentList._id, store.currentList);
        if (response.data.success) {
            store.loadMyLists();
        }
    }

    store.postComment = async function (message, listId) {
        let comment = {
            message: message,
            listId: listId,
            creator: auth.user.username,
            created: Date.now()
        }
        const response = await api.postComment(listId, comment);
        if (response.data.success) {
            return comment;
        }
    }

    store.getUserInfo = async function (id) {
        console.log("Getting user info for ", id);
        const response = await api.getUserInfo(id);
        console.log("Info: ", response);
        if (response.status == 200) {
            let userInfo = response.data;
            console.log(userInfo);
            storeReducer({
                type: GlobalStoreActionType.GET_USER_INFO,
                payload: {
                    profileInfo: userInfo
                }
            });
        }
    }

    /*store.deleteSection = async function (sectionId) {
        let response = await api.getSection(sectionId);
        if (response.status == 200) {
            let currentSection = response.data.section;
            console.log(currentSection);
            if (currentSection.parent == null) {
                console.log("Cannot delete root section");
            }
            else {
                console.log(sectionId);
                response = await api.deleteSection(sectionId);
                if (response.status == 200) {
                    console.log("Successfully deleted section");
                    console.log(response.data);
                    storeReducer({
                        type: GlobalStoreActionType.UNMARK_SECTION_FOR_DELETION,
                        payload: { deletedSection: response.data}
                    });
                }
            }
        }
    }*/

    store.updateSection = async function (sectionId, section) {
        let response = await api.updateSection(sectionId, section);
        if (response.status == 200) {
            console.log("Successfully updated section");
        }
        else {
            console.log("Something went wrong with updating section");
        }
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };
