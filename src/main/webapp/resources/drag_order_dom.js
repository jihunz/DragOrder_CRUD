class DragOrder {
    constructor(selector, direction) {
        this.list = [];

        const root = document.querySelector(selector);

        root.querySelectorAll(".dragItem").forEach((item, index) => {
            item.setAttribute("draggable", true);
            // data-order 값은 등록 시 서버에서 부여하며, 해당 값을 서버로 부터 받아옴 -> 해당 클래스가 부여할 경우 주석 삭제할 것
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
                this.moveOrder();
                this.saveOrder();
            });
        });
    }

    moveOrder() {
        const source_ = parseInt(this.source.dataset["order"]);
        const target_ = parseInt(this.target.dataset["order"]);

        this.list.forEach(item => {
            const order = parseInt(item.getAttribute("data-order"));

            if (source_ < target_) {
                this.target.parentNode.insertBefore(this.source, this.target.nextSibling);

                if (order == source_)
                    item.setAttribute("data-order", target_);
                    // 변경될 order 값만 배열(전역 변수)에 저장하는 함수 호출
                else if (order > source_ && order <= target_)
                    item.setAttribute("data-order", order - 1);
                    // 변경될 order 값만 배열(전역 변수)에 저장하는 함수 호출
            } else {
                this.target.parentNode.insertBefore(this.source, this.target);

                if (order == source_)
                    item.setAttribute("data-order", target_);
                    // 변경될 order 값만 배열(전역 변수)에 저장하는 함수 호출
                else if (order < source_ && order >= target_)
                    item.setAttribute("data-order", order + 1);
                    // 변경될 order 값만 배열(전역 변수)에 저장하는 함수 호출
            }
        });
    }

    saveOrder() {
        const orders = [];
        const items = document.querySelectorAll(".dragItem");

        items.forEach((item, i) => {
            const code = parseInt(item.dataset["code"]);
            const originalOrder = parseInt(item.dataset["order"]);
            const element = {code, originalOrder};

            orders.push(element);
        });
        console.log(orders);

        fetch('book/saveOrder', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orders),
        }).then(res => res.json()).then(result => {
            alert(result);
        }).catch(err => console.log(err));
    }

    // 변경될 order 값과 code를 배열(전역 변수)에 저장하는 함수 생성 -> 서버에서 WHERE code로 변경된 레코드의 order만 변경
    
    // 저장한 배열 서버로 보내는 함수 생성
}