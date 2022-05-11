class DragOrder {
    constructor (selector, direction) {
        this.list = [];

        const root = document.querySelector(selector);        

        root.querySelectorAll(".dragItem").forEach((item, index) => {                
            item.setAttribute("draggable", true);
            item.dataset["order"] = index + 1;            
    
            this.list.push(item);
        });                            
    
        this.list.forEach(item => {
            // 드래그 시작 이벤트 핸들러
            item.addEventListener("dragstart", e => {
				const target = e.target.closest(".dragItem"); 
				
                console.log(`dragStart: ${target.dataset["order"]}`);
    
                // 순서값 order 를 저장
                this.source = target;
                //e.dataTransfer.setData('text/plain', target.dataset["order"]);
    
                // 드래그 중인 데이터를 표시
                target.classList.add("dragStart");
            });
    
            // 드래그 아이템이 영역에 들어오는 이벤트 핸들러
            item.addEventListener("dragenter", e => {
				const target = e.target.closest(".dragItem");
				
                console.log(`dragEnter: ${target.dataset["order"]}`);

                // e.preventDefault();

                target.classList.add("dragOver");
            });
    
            // 드래그 아이템이 영역에 오버하는 이벤트 핸들러
            item.addEventListener("dragover", e => {
				const target = e.target.closest(".dragItem");
								
                console.log(`dragOver: ${target.dataset["order"]}`);

                // dragover 에서 이벤트 버블링을 캔슬링 해야 drop 이벤트 발생
                e.preventDefault();
            });
    
            // 드래그 아이템이 영역에서 나가는 이벤트 핸들러
            item.addEventListener("dragleave", e => {
				const target = e.target.closest(".dragItem");
				
                console.log(`dragLeave: ${target.dataset["order"]}`);
                
                target.classList.remove("dragOver");
            });

            // 드래그 아이템이 드랍 되는지 상관없이 종결되는 이벤트 핸들러
            item.addEventListener("dragend", e => {
				const target = e.target.closest(".dragItem");
				
                console.log(`dragEnd: ${target.dataset["order"]}`);

                target.classList.remove("dragStart");
            });
    
            // 드래그 아이템이 드랍 되는 이벤트 핸들러
            item.addEventListener("drop", e => {
				const target = e.target.closest(".dragItem");
				
                console.log(`drop: ${target.dataset["order"]}`);

                target.classList.remove("dragOver");
    
                this.target = target;
                //const sourceOrder = e.dataTransfer.getData('text/plain');
                //const targetOrder = target.dataset["order"];                
    
                console.log(`${this.source.dataset["order"]} ====>>> ${this.target.dataset["order"]}`);
                this.moveOrder();                  
            });
        });
    }

    moveOrder() {
        const source_ = parseInt(this.source.dataset["order"]);
        const target_ = parseInt(this.target.dataset["order"]);

        this.list.forEach( item => {
            const order = parseInt(item.getAttribute("data-order"));

            if(source_ < target_) {
                this.target.parentNode.insertBefore(this.source, this.target.nextSibling);

                if(order == source_)
                    item.setAttribute("data-order", target_);
                else if(order > source_ && order <= target_)
                    item.setAttribute("data-order", order - 1);                    
            } else {
                this.target.parentNode.insertBefore(this.source, this.target);

                if(order == source_)
                    item.setAttribute("data-order", target_);                    
                else if(order < source_ && order >= target_)
                    item.setAttribute("data-order", order + 1);
            }         
        });
    }
}