define(function(){
	var data ={
            layout : [{ type: 'row',
                height: '800',
                width: '',
                pluginId: '',
                id: 'body',
                layout: [],
                title : '',
                border : {
                	
                }
            }],

           plugin : {
        	   
           },
           
           main : {
        	   templateName : '', 
        	   templateType : '',
        	   templateId : '',
        	   templateDes : ''
           }
	}
	
	return {
		data : data,
		setData : function( a){
			this.data = a;
		},
		getData : function(){
			return this.data;
		}
	};
});