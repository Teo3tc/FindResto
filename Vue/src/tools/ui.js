
const ui = {
    ui: document.querySelector(".ui"),
    itemMatch : [],
    itemNotMatch : [],

    openListIfnotOpen:function(){     
         // check if list 
          if (!document.querySelector('#list').classList.contains('translateList')) {
            const uii = document.querySelector(".ui");
            const list = document.querySelector(".list");
            const widthList = list.getBoundingClientRect().width
            const uiBtn = document.querySelector(".iconList");
            const btnAddResto = document.querySelector(".btn__addResto")
            const btnFilter = document.querySelector(".btn__Filter")

            // move Ui  width of List
            uii.style.transform = `translateX(-${widthList}px)`
            uii.style.marginRight = '0'
            list.classList.toggle("translateList");
            // change btn add resto  by filter
            if(uiBtn.classList.contains('fa-list')){
                uiBtn.classList.add('fa-chevron-right')
                uiBtn.classList.remove('fa-list')
  
                btnAddResto.style.display = 'none'
                btnFilter.style.display = 'grid'
            }
          }
    },
    checkMarkerMatchItem:function(marker){      
        let items = document.querySelectorAll('.item');

        items = Array.from(items);
        ui.itemMatch = items.filter((item) => {
            if (item.getAttribute('title') == marker.title) {
                return item;
            }
        });
        ui.itemNotMatch = items.filter((item) => {
            if (item.getAttribute('title') != marker.title) {
                return item;
            }
        });
  
      
    },
    goToItemAndOpenReview:function(){              
        
        ui.itemMatch[0].scrollIntoView({
            behavior: 'smooth',
        });
        const itemUl = ui.itemMatch[0].querySelector('ul');
        itemUl.style.maxHeight = itemUl.scrollHeight + 'px';
        itemUl.style.opacity = '1'
        ui.itemNotMatch.map((item) => {
            item.classList.remove('open');
            const itemUl = item.querySelector('ul');
            itemUl.style.maxHeight = null;
            itemUl.style.opacity = '0'
  
        });
    },
    moveUi:function() {
        const ui = document.querySelector(".ui");
        const uiBtn = document.querySelector(".iconList");
        const list = document.querySelector(".list");
        const btnAddResto = document.querySelector(".btn__addResto");
        const btnFilter = document.querySelector(".btn__Filter");
        const filter = document.querySelector('.box__RangeStar')

        const widthList = list.getBoundingClientRect().width
        ui.style.transform = `translateX(-${widthList}px)`
        ui.style.marginRight = '0'
        list.classList.toggle("translateList");

        if(uiBtn.classList.contains('fa-list')){
            uiBtn.classList.add('fa-chevron-right')
            uiBtn.classList.remove('fa-list')
            btnAddResto.style.display = 'none'
            btnFilter.style.display = 'grid'
        }else{
            uiBtn.classList.remove('fa-chevron-right')
            uiBtn.classList.add('fa-list')
            ui.style.transform = `translateX(0)`
            ui.style.marginRight = '1em'
            btnAddResto.style.display = 'grid'
            btnFilter.style.display = 'none'
            filter.classList.remove('openFilter')
        }
    } ,
    makeStar:function(rank) {
        const zeroStar = `<i style="color: gold;" class="far fa-star"></i> <i style="color: gold;" class="far fa-star"></i> <i style="color: gold;" class="far fa-star"></i> <i style="color: gold;" class="far fa-star"></i> <i style="color: gold;" class="far fa-star"></i>`;
        const zeroHafStar =
          '<i style="color: gold; "class="fas fa-star-half-alt" ></i> <i style="color: gold;" class="far fa-star"> <i style="color: gold;" class="far fa-star"></i> <i style="color: gold;" class="far fa-star"></i> <i style="color: gold;" class="far fa-star"></i>';
  
        const oneStar =
          '<i style="color: gold;" class="fas fa-star"></i> <i style="color: gold;" class="far fa-star"></i> <i style="color: gold;" class="far fa-star"></i> <i style="color: gold;" class="far fa-star"></i> <i style="color: gold;" class="far fa-star"></i>';
        const oneHafStar =
          '<i style="color: gold;" class="fas fa-star"></i> <i style="color: gold;" "class="fas fa-star-half-alt"></i> <i style="color: gold;" class="far fa-star"></i> <i style="color: gold;" class="far fa-star"></i> <i style="color: gold;" class="far fa-star"></i>';
  
        const twoStar =
          '<i style="color: gold;" class="fas fa-star"></i> <i style="color: gold;" class="fas fa-star"></i> <i style="color: gold;" class="far fa-star"></i> <i style="color: gold;" class="far fa-star"></i> <i style="color: gold;" class="far fa-star"></i>';
        const twoHafStar =
          '<i style="color: gold;" class="fas fa-star"></i> <i style="color: gold;" class="fas fa-star"></i> <i style="color: gold;" class="fas fa-star-half-alt"></i> <i style="color: gold;" class="far fa-star"></i> <i style="color: gold;" class="far fa-star"></i>';
  
        const threeStar =
          '<i style="color: gold;" class="fas fa-star"></i> <i style="color: gold;" class="fas fa-star"></i> <i style="color: gold;" class="fas fa-star"></i> <i style="color: gold;" class="far fa-star"></i> <i style="color: gold;" class="far fa-star"></i>';
        const threeHafStar =
          '<i style="color: gold;" class="fas fa-star"></i> <i style="color: gold;" class="fas fa-star"></i> <i style="color: gold;" class="fas fa-star"></i> <i style="color: gold;" class="fas fa-star-half-alt"></i> <i style="color: gold;" class="far fa-star"></i>';
  
        const forStar =
          '<i style="color: gold;" class="fas fa-star"></i> <i style="color: gold;" class="fas fa-star"></i> <i style="color: gold;" class="fas fa-star"></i> <i style="color: gold;" class="fas fa-star"></i> <i style="color: gold;" class="far fa-star"></i>';
        const forHafStar =
          '<i style="color: gold;" class="fas fa-star"></i> <i style="color: gold;" class="fas fa-star"></i> <i style="color: gold;" class="fas fa-star"></i> <i style="color: gold;" class="fas fa-star"></i> <i style="color: gold;" class="fas fa-star-half-alt"></i>';
  
        const fiveStar =
          '<i style="color: gold;" class="fas fa-star"></i> <i style="color: gold;" class="fas fa-star"></i> <i style="color: gold;" class="fas fa-star"></i> <i style="color: gold;" class="fas fa-star"></i> <i style="color: gold;" class="fas fa-star"></i>';
        if ((rank >= 0 && rank <= 0.4) || rank == undefined) {
          return zeroStar;
        } else if (rank >= 0.5 && rank < 1) {
          return zeroHafStar;
        } else if (rank >= 1 && rank <= 1.4) {
          return oneStar;
        } else if (rank >= 1.5 && rank < 2) {
          return oneHafStar;
        } else if (rank >= 2 && rank <= 2.4) {
          return twoStar;
        } else if (rank >= 2.5 && rank < 3) {
          return twoHafStar;
        } else if (rank >= 3 && rank <= 3.4) {
          return threeStar;
        } else if (rank >= 3.5 && rank < 4) {
          return threeHafStar;
        } else if (rank >= 4 && rank <= 4.4) {
          return forStar;
        } else if (rank >= 4.5 && rank < 5) {
          return forHafStar;
        } else if (rank >= 5) {
          return fiveStar;
        }
    },  
    openAvis: function(e) {
        const el = e.target;
        const parent = e.target.parentElement;
        const ul = parent.querySelector("ul");
        if (ul.style.maxHeight) {
          ul.style.maxHeight = null;
          ul.style.opacity = "0";
          el.classList.remove("btnOpen");
        } else {
          ul.style.maxHeight = ul.scrollHeight + "px";
          ul.style.opacity = "1";
          el.classList.add("btnOpen");
        }
    },
}
export default ui;
