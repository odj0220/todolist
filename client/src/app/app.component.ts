import {Component, ViewChild} from '@angular/core';
import {Service} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('upload') upload: any;

  list: any = '';
  insert: any = {
    description: '',
    priority: 'middle'
  };
  priority: any = ['high', 'middle', 'low'];
  status: any = ['inprogress', 'close'];

  constructor(
    private service: Service,
  ) {
  }

  ngOnInit(): void {
    this.getTodoList();
  }

  getTodoList(){
    this.service.getTodoList()
      .then(d => {
        this.list = d;
        this.list.sort((a,b) => {
          return new Date(b.created).getTime() - new Date(a.created).getTime();
        });
      });
  }

  insertItem(){
    this.service.setTodo(this.insert)
      .then(d => {
        //insert 초기화
        this.insert = {
          description: '',
          priority: 'middle'
        };

        // 목록 리로드
        this.getTodoList();
      });
  }

  update(item){
    this.service.update(item)
      .then(d => {
        item = d;
      })
  }

  delete(item){
    console.log(item);
    this.service.delete(item._id)
      .then(d => {
        this.getTodoList();
      })
  }

  export() {
    const data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.list));
    const a = document.createElement("a");
    a.setAttribute('style', 'display:none;');
    document.body.appendChild(a);
    var url= 'data:' + data;
    a.href = url;
    a.download = 'TodoList.json';
    a.click();
    a.remove();

  }

  import(event){
    const file = event.target.files[0];
    if(file.type !== 'application/json'){
      alert('json 파일이 아닙니다.');
      event.target.value = null;
      return false;
    }else{
      let reader = new FileReader();
      let component = this;
      reader.onloadend = function(e){
        let obj = JSON.parse(reader.result);
        component.uploadJson(obj);
      };
      reader.readAsText(event.target.files[0]);
    }
  }

  uploadJson(json){
    this.service.setTodoList(json)
      .then(d => {
        console.log(d);
        this.getTodoList();
      })
  }
}
