class DragOrder {
    constructor(selector, direction) {
        this.list = [];

        // 순서가 변경된 드래그 아이템의 data-code, data-order을 저장하기 위한 리스트
        this.changedList = [];

        const root = document.querySelector(selector);

        root.querySelectorAll(".dragItem").forEach((item, index) => {
            item.setAttribute("draggable", true);
            // data-order 값은 등록 시 서버에서 부여하며, 해당 값을 서버로 부터 받아옴
            // item.dataset["order"] = index + 1;

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

                // 순서가 바뀐 item이 누적되지 않도록 리스트를 초기화
                this.changedList = [];
                this.moveOrder();
                this.saveOrder();
            });
        });
    }

    moveOrder() {
        const source_ = parseInt(this.source.dataset["order"]);
        const target_ = parseInt(this.target.dataset["order"]);

        
        this.list.forEach(item => {
            // order 값이 변한 item의 code를 저장하기 위한 필드
            const code = parseInt(item.getAttribute("data-code"));
            // order 값이 변한 item의 order값을 저장하기 위해 전역 변수로 변경 (const -> var)
            var order = parseInt(item.getAttribute("data-order"));

            if (source_ < target_) {
                this.target.parentNode.insertBefore(this.source, this.target.nextSibling);

                if (order == source_){
                    // 드래그 아이템의 data-order값을 target 값으로 바꾸고
                    item.setAttribute("data-order", target_);

                    // 해당 아이템의 code, data-order를 changedList에 저장
                    // 아래 조건문의 코드들도 동일한 기능을 한다.
                    this.putOrder(code, parseInt(item.getAttribute("data-order")));
                }
                else if (order > source_ && order <= target_) {
                    item.setAttribute("data-order", order - 1);

                    this.putOrder(code, parseInt(item.getAttribute("data-order")));
                }
            } else {
                this.target.parentNode.insertBefore(this.source, this.target);

                if (order == source_) {
                    item.setAttribute("data-order", target_);
                    
                    this.putOrder(code, parseInt(item.getAttribute("data-order")));
                }
                else if (order < source_ && order >= target_) {
                    item.setAttribute("data-order", order + 1);
                    
                    this.putOrder(code, parseInt(item.getAttribute("data-order")));
                }
            }
        });
    }

    
    // code, data-order를 배열(전역 변수)에 저장하는 함수
    putOrder(code, currentOrder) {
        this.changedList.push({code, currentOrder});
    }
    
    // 저장한 배열을 서버로 보내는 함수 -> 서버에서 WHERE code로 변경된 레코드의 order만 변경
    saveOrder() {
        fetch('book/saveOrder', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.changedList),
        }).then(res => res.json()).then(result => {
            alert(result);
        }).catch(err => console.log(err));
    }
}