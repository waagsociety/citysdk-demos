var cbsLayers={
      layer:"C.B.S.",
      data:[
      {value:"bev_dichth", description:"Bev. dichtheid"},
      {value:"aant_inw", description:"Aantal inwoners"},
      {value:"aant_vrouw", description:"Aantal vrouwen"},
      {value:"aant_man", description:"Aantal mannen"},
      {value:"aantal_hh", description:"Aantal huishoudens"},
      {value:"gem_hh_gr", description:"Gemm. hh grote"},
      {value:"p_gehuwd", description:"Perc. gehuwd"},
      {value:"p_hh_m_k", description:"Perc. hh met kinderen"},
      {value:"p_hh_z_k", description:"Perc. hh zonder kinderen"},
      {value:"p_eenp_hh", description:"Perc. 1pers. hh"},
      {value:"p_gescheid", description:"Perc. gescheiden"},
      {value:"p_ongehuwd", description:"Perc. ongehuwd"},
      {value:"p_verweduw", description:"Perc. weduw"},
      
      {value:"p_surinam", description:"Perc. Surninaams"},
      {value:"p_ant_aru", description:"Perc. Antiliaans"},
      {value:"p_marokko", description:"Perc. Marokaans"},
      {value:"p_turkije", description:"Perc. Turks"},
      {value:"p_west_al", description:"Perc. west. allochtoon"},
      {value:"p_n_w_al", description:"Perc. niet west. allochtoon"},
      {value:"p_over_nw", description:"Perc. overig niet west."},

      {value:"p_00_14_jr", description:"Perc. 0 - 14 jaar"},
      {value:"p_15_24_jr", description:"Perc. 15 - 24 jaar"},
      {value:"p_25_44_jr", description:"Perc. 25 - 44 jaar"},
      {value:"p_45_64_jr", description:"Perc. 45 - 64 jaar"},
      {value:"p_65_eo_jr", description:"Perc. 65+ jaar"},
      
      
      {value:"opp_tot", description:"Opp. totaal"},
      {value:"opp_land", description:"Opp. land"},
      {value:"opp_water", description:"Opp. water"},
      ]
    };



WAAG.Menu = function Menu(container) {
  
  console.log("menu constructor innited");
  
  init = function() {
    console.log("menu constructor initted");
  }
  
  createMenuItems =function(dataLayer, subLayer){
    console.log("setting menu items");
    // var menu = d3.select("#menu_container"); 
    // menu.append("div")
    //       .attr("id", "collapsible_"+dataLayer.layer)
    //       .attr("data-role", "collapsible")
    //       .attr("data-mini", "false")
    //       .attr("data-theme", "a")
    //       .attr("data-content", "a")
    //       .append("h4")
    //         .text("test collaps")
    //         
    //         
    // d3.select("#collapsible_"+dataLayer.layer)
    //     .append("ul")
    //      .attr("id", "listview_"+dataLayer.layer)
    //      .attr("data-role", "listview");

    
    
  }
  
  updateListView = function(activeLayer){

    var id="#listview_cbs";
    var list = d3.select(id);

      // (re) createlist     
        list.selectAll("ul")
          .data(cbsLayers.data)
          .enter()
          .append("li")
          .attr("id", function(d, i){ return i})
          .attr("layer", cbsLayers.layer)
          .attr("data-mini", "true")
          .attr("data-icon", function(d){ 
                  if(d.value==activeLayer){
                    d.checked=true;
                    return "check";
                  }else{
                    d.checked=false;
                    return "plus";
                  }  
              }) 
   
            .each(function(d) {
                    d3.select(this).append("a")
                      .attr("href", function(d){ return "#";})
                      .text(d.description)
                  
                })
          .on("click", function(d){
              console.log("updating cbs layer "+d.value);
              geoMap.setActiveLayer(d.value);

    		});

      $(id).listview("refresh");
     
    }
    
    updateListIcons = function(activeLayer){
      var id="#listview_cbs";
      var list = d3.select(id);
      console.log("active layer ="+activeLayer)
      //update list       
       list.selectAll("li")
         .data(cbsLayers.data)
         .attr("data-icon", function(d){ 
                if(d.value==activeLayer){
                   d.checked=true;
                   $(this).buttonMarkup({ icon: "check" });
                 }else{
                   d.checked=false;
                   $(this).buttonMarkup({ icon: "plus" });
                   return "star";
                 }  
             })
            
             
    }

  	d3.selectAll("#selector").on("change", function() {
  	  console.log("on change selector name ="+this.name);
  	  if(this.name=="colorBrewer"){
  	    d3.selectAll("#main_map").attr("class", this.value);
  	    d3.selectAll("#cbs").attr("class", this.value);
        d3.selectAll("#barChart").attr("class", this.value);
        d3.selectAll("#legenda").attr("class", this.value);
        d3.selectAll("#circlePack").attr("class", this.value);
        d3.selectAll("#circlePacks").attr("class", this.value);
        
  	    
  	  }

    }); 
    

    $(":checkbox").bind ("change", function (event)
    {
      if ($(this).attr('checked')) {
        //console.log("checked --" );
      }else{
        //console.log("unchecked");
      }
      //console.log("on change input check ="+this.checked);
      
      if(this.name=="geoScaling"){
        geoMap.updateGeoScaling( this.checked);
        
        //dataLayers[i].layers[j].properties.geoscaling=this.checked;
        //geoMap.updateRegionsMap( dataLayers[i].layers[j]);

      }

        console.log("checkbox "+this.name);
    });
    

  this.init=init;
  this.createMenuItems=createMenuItems;
  this.updateListView=updateListView;
  this.updateListIcons=updateListIcons;
  
}

