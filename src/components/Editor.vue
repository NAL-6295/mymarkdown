<template>
  <div class="editor">
  <h1> エディター画面</h1>
    <span>{{ user.displayName }}</span>
    <button @click="logout">ログアウト  </button>
    <div class="memoListWrappter">
        <div class="memoList" v-for="(memo,index) in memos" v-bind:key="index"  @click="selectMemo(index)" :data-selected="index==selectedIndex">
            <p class="memoTitle">{{memo.title}}</p>
        </div>
        <button class="addMemoBtn" @click="addMemo">メモの追加</button>
        <button class="deleteMemoBtn" v-if="memos.length > 1" @click="deleteMemo">選択中のメモの削除</button>
        <button class="saveMemosBtn" @click="saveMemos"> メモの保存 </button>
    </div>
  タイトル<input type="text" v-model="memos[selectedIndex].title" />
  <div class="editorWrapper">
  <textarea class="markdown" v-model="memos[selectedIndex].markdown"></textarea>
  <div class="preview" v-html="preview()"></div>
  </div>
  </div>
</template>
 
<script>
import showdown from 'showdown';
 export default {
  name: 'editor',
props: ['user'],
  data () {
  return {
    memos:[{
        markdown:'',
        title:'',
    }],
    selectedIndex :0
  }
  },
created:function(){
    showdown.setOption('omitExtraWLInCodeBlocks', 'true');
    showdown.setOption('noHeaderId', 'true');
    showdown.setOption('parseImgDimensions', 'true');
    showdown.setOption('tables', 'true');
    showdown.setOption('tasklists', 'true');
    firebase.database()
    .ref('memos/' + this.user.uid)
    .once('value')
    .then(result =>{
        if(result.val()){
            this.memos = result.val();
        }
    })
},
methods:{
    logout:function(){
        firebase.auth().signOut();
        },
    addMemo:function(){
        this.memos.push({
            markdown:'',
            title:'',
        });
        this.selectedIndex = this.memos.length -1;
    },
    selectMemo:function(index){
        this.selectedIndex = index;
    },
    preview:function(){
        var converter = new showdown.Converter();

        return  converter.makeHtml(this.memos[this.selectedIndex].markdown);
    },
    deleteMemo:function(){
        this.memos.splice(this.selectedIndex,1);
        if(this.selectedIndex > 0){
            this.selectedIndex--;
        }
        console.log("a");
        console.log("b");
        console.log(this.selectedIndex);
        console.log(this.memos);
    },
    saveMemos:function(){
        firebase.database()
        .ref('memos/' + this.user.uid)
        .set(this.memos);
    },

 }
}
</script>
<style lang="scss" scoped>
 .memoListWrapper {
   width: 19%;
  float: left;
  border-top: 1px solid #000;
 }
 .memoList {
  padding: 10px;
  box-sizing: border-box;
  text-align: left;
  border-bottom: 1px solid #000;
  &:nth-child(even) {
  background-color: #ccc;
  }
  &[data-selected="true"] {
  background-color: #ccf;
  }
 }
 .memoTitle {
  height: 1.5em;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
 }
 .addMemoBtn {
  margin-top: 20px;
 }
 .markdown {
  float: left;
  width: 40%;
  height: 500px;
 }
 .preview {
  float: left;
  width: 40%;
  text-align: left;
 }
 deleteMemoBtn{
     margin:10px;
 }
 </style>