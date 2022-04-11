import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../api'
import AuthContext from '../auth'
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

export const MediaType = {
    COMIC: "COMIC",
    STORY: "STORY"
}

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "UNMARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_ITEM_EDIT_ACTIVE: "SET_ITEM_EDIT_ACTIVE",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    LOAD_LISTS: "LOAD_LISTS",
    SEARCH_LISTS: "SEARCH_LISTS",
    SET_MEDIA: "SET_MEDIA"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        mediaType: MediaType.STORY,
        lists: [],
        allLists: [],
        currentList: null,
        editActive: false,
        listMarkedForDeletion: null,
        listViewMode: null,
        search: ""
    });
    const history = useHistory();

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LOADS A SET OF LISTS
            case GlobalStoreActionType.SET_MEDIA: {
                return setStore({
                    mediaType: payload.mediaType,
                    lists: [],
                    allLists: [],
                    currentList: null,
                    editActive: false,
                    listMarkedForDeletion: null,
                    listViewMode: null,
                    search: ""
                });
            }
            case GlobalStoreActionType.LOAD_LISTS: {
                return setStore({
                    lists: payload.lists,
                    allLists: payload.lists,
                    currentList: null,
                    editActive: false,
                    listMarkedForDeletion: null,
                    listViewMode: payload.listViewMode,
                    search: ""
                });
            }
            // SEARCH A SET OF LISTS
            case GlobalStoreActionType.SEARCH_LISTS: {
                return setStore({
                    lists: payload.lists,
                    allLists: store.allLists,
                    currentList: null,
                    editActive: false,
                    listMarkedForDeletion: null,
                    listViewMode: store.listViewMode,
                    search: payload.search
                });
            }
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.top5List,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    lists: store.lists,
                    allLists: store.allLists,
                    currentList: null,
                    editActive: false,
                    listMarkedForDeletion: store.listMarkedForDeletion,
                    listViewMode: store.listViewMode,
                    search: store.search
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    lists: store.lists,
                    allLists: store.allLists,
                    currentList: payload,
                    editActive: true,
                    listMarkedForDeletion: null,
                    listViewMode: store.listViewMode,
                    search: store.search
                })
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    lists: store.lists,
                    allLists: store.allLists,
                    currentList: null,
                    editActive: true,
                    listMarkedForDeletion: payload,
                    listViewMode: store.listViewMode,
                    search: store.search
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    lists: store.lists,
                    allLists: store.allLists,
                    currentList: null,
                    editActive: false,
                    listMarkedForDeletion: null,
                    listViewMode: store.listViewMode,
                    search: store.search
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    lists: store.lists,
                    allLists: store.allLists,
                    currentList: payload,
                    editActive: true,
                    listMarkedForDeletion: null,
                    listViewMode: store.listViewMode,
                    search: store.search
                });
            }
            // START EDITING A LIST ITEM
            case GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: false,
                    isItemEditActive: payload,
                    listMarkedForDeletion: null
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    isListNameEditActive: true,
                    isItemEditActive: false,
                    listMarkedForDeletion: null
                });
            }
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    store.handleMediaSwitch = () => {
        storeReducer({
            type: GlobalStoreActionType.SET_MEDIA,
            payload: {
                mediaType: (store.mediaType === MediaType.STORY) ? MediaType.COMIC : MediaType.STORY
            }
        });
    }

    store.goHome = () => {
        history.push("/");
    }

    store.clearListsForUserView = () => {
        storeReducer({
            type: GlobalStoreActionType.LOAD_LISTS,
            payload: {
                lists: [],
                listViewMode: ListViewMode.USER_LISTS
            }
        });
    }

    store.hasPublishedListName = (name) => {
        if (!store.allLists || store.listViewMode !== ListViewMode.MY_LISTS) {
            auth.setError("ERROR: You must reload your personal lists to enable publishing");
            return true;
        }

        for (let i = 0; i < store.allLists.length; i++) {
            if (store.allLists[i].published && store.allLists[i].name.toLowerCase() === name.toLowerCase())
                return true;
        }

        return false;
    }

    store.reloadLists = async function () {
        if (store.listViewMode === ListViewMode.MY_LISTS) {
            store.loadMyLists();
        }
    }

    store.loadCommunityLists = async function () {
        let response = await api.getCommunityTop5Lists();
        if (response.data.success) {
            let top5Lists = response.data.data;
            storeReducer({
                type: GlobalStoreActionType.LOAD_LISTS,
                payload: {
                    lists: top5Lists,
                    listViewMode: ListViewMode.COMMUNITY_LISTS
                }
            });
        }
        history.push("/");
    }

    store.loadMyLists = async function () {
        let response = await api.getMyTop5Lists();
        if (response.data.success) {
            let top5Lists = response.data.data;
            // alert(top5Lists);
            storeReducer({
                type: GlobalStoreActionType.LOAD_LISTS,
                payload: {
                    lists: top5Lists,
                    listViewMode: ListViewMode.MY_LISTS
                }
            });
        }
        history.push("/");
    }

    store.loadPublishedLists = async function () {
        let response = await api.getAllPublishedTop5Lists();
        if (response.data.success) {
            let top5Lists = response.data.data;
            storeReducer({
                type: GlobalStoreActionType.LOAD_LISTS,
                payload: {
                    lists: top5Lists,
                    listViewMode: ListViewMode.PUBLISHED_LISTS
                }
            });
        }
        history.push("/");
    }

    store.loadListsByUsername = async function (username) {
        let response = await api.getTop5ListsByUsername(username);
        if (response.data.success) {
            let top5Lists = response.data.data;
            storeReducer({
                type: GlobalStoreActionType.LOAD_LISTS,
                payload: {
                    lists: top5Lists,
                    listViewMode: ListViewMode.USER_LISTS
                }
            });
            storeReducer({
                type: GlobalStoreActionType.LOAD_LISTS,
                payload: {
                    lists: top5Lists,
                    listViewMode: ListViewMode.USER_LISTS
                }
            });

            // storeReducer({
            //     type: GlobalStoreActionType.SEARCH_LISTS,
            //     payload: {
            //         lists: store.lists,
            //         search: username
            //     }
            // });

        }
        history.push("/");
    }

    store.viewList = async function (list) {
        let response = await api.viewList(list._id);
        if (response.data.success) {
            list.views = list.views + 1;
            return list;
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

    store.likeList = async function (list, like) {
        let lType = (store.listViewMode === ListViewMode.COMMUNITY_LISTS) ? "community" : "normal";
        let response = await api.likeList(list._id, {like: like, listType: lType}).catch((err) => {
            console.log(err);
            if (err.response) {
                auth.setError("Like failed!");
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
            if (!auth.user.likes) {
                auth.user.likes = [];
            }
            auth.user.likes.push(response.data.like);
            return response.data.top5List;
        }
    }

    store.unlikeList = async function (list, like) {
        let lType = (store.listViewMode === ListViewMode.COMMUNITY_LISTS) ? "community" : "normal";
        let response = await api.unlikeList(list._id, {like: like, listType: lType}).catch((err) => {
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
            views:  0
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
    store.markListForDeletion = async function (id) {
        // GET THE LIST
        let response = await api.getTop5ListById(id);
        if (response.data.success) {
            let top5List = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                payload: top5List
            });
        }
    }

    store.deleteList = async function (listToDelete) {
        let response = await api.deleteTop5ListById(listToDelete._id);
        if (response.data.success) {
            store.reloadLists();
        }
    }

    store.deleteMarkedList = function () {
        store.deleteList(store.listMarkedForDeletion);
    }

    store.unmarkListForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
            payload: null
        });
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = async function (id) {

        let response = await api.getTop5ListById(id).catch((err) => {
            if (err.response) {
                history.push("/");
                auth.setError(err.response.errorMessage);
            }
            else {
                history.push("/");
                auth.setError("ACCESS DENIED: You do not own this list!");
            }
        });
        if (typeof response !== 'undefined' && response.data.success) {
            let top5List = response.data.top5List;
            storeReducer({
                type: GlobalStoreActionType.SET_CURRENT_LIST,
                payload: top5List
            });
            history.push("/top5list/" + id);
        } else {
            // alert("IN ELSE");
            history.push("/");
            auth.setError("ACCESS DENIED: You do not own this list!");
        }
    }

    store.clearCurrentList = () => {
        storeReducer({
            type: GlobalStoreActionType.SET_CURRENT_LIST,
            payload: null
        });
    }

    store.initState = () => {
        setStore({
            lists: [],
            allLists: [],
            currentList: null,
            editActive: false,
            listMarkedForDeletion: null,
            listViewMode: null
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

    store.undo = function () {
        // tps.undoTransaction();
    }

    store.redo = function () {
        // tps.doTransaction();
    }

    store.canUndo = function() {
        // return tps.hasTransactionToUndo();
    }

    store.canRedo = function() {
        // return tps.hasTransactionToRedo();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING AN ITEM
    store.setIsItemEditActive = function (status) {
        storeReducer({
            type: GlobalStoreActionType.SET_ITEM_EDIT_ACTIVE,
            payload: status
        });
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