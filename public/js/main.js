var api_obj={
	name:'xxx',
    add($d,$call_back){
        //send the body with json format, look into the chrome dev tool for detials
        $.ajax({
            method:'POST',
            url:'/api/'+this.name,
            data:JSON.stringify($d),
            contentType: "application/json; charset=utf-8",
	        dataType: "json"
        }).done($call_back);

    },
	ls($call_back){
		$.get('/api/'+this.name,$call_back);
	},
	rm($id,$call_back){
        $.ajax({
            method:'DELETE',
            url:'/api/'+this.name+'/'+$id

        }).done($call_back);
	}
	
};

var user=Object.assign({},api_obj,{
	name:'users'
});



var ui={

	init(){
		this.tb=$('#tb1');
		this.input_name=$('#name');
		this.init_event();
		this.render_tb();
	},
	init_event(){
		var $self=this;
		this.tb.on('click','.btn_del',($event)=>{
			var $obj=$($event.currentTarget);
			var $tr=$obj.parents('tr');
			var $id=$tr.attr('_id');
			user.rm($id,()=>{
				$self.render_tb()
				
			})
			

		});
        
        $('#btn_add').on('click',($event)=>{
            let $d={};
            $d.name=$self.input_name.val();
            if ($d.name){ //check name exist
                user.add($d,()=> $self.render_tb());    
                $self.input_name.val(''); //clear input
            }
            return false;
            
            
            
        });
	},
    
	render_tb(){
		user.ls(($data)=>{
			var $tbb=$('#tb1 tbody');
			$tbb.html('');
			for (let $d of $data){
				$tbb.append(`<tr _id="${$d._id}" >
					<td>${$d._id}</td>
					<td>${$d.name}</td>
					<td><button  class="btn_del">Del</button></td>
				</tr>`);

			}

		});
		
		
	}
	
};

ui.init();
