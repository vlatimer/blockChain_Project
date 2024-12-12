// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Freelance is ERC20 {
    struct Response {
        uint16 statusCode;
    }

    uint256 private TOKENS_COST = 10 wei;
    uint32 private TOKENS_GIVEN = 100;

    enum OrderStatus {
        Open, Processing, Done
    }
    enum PaymentStatus {
        Unpaid, Paid, Received
    }

    struct Employee {
        address addr;
    }

    struct Order {
        uint256 id;
        string name;
        address creator;
        uint256 payment;
        OrderStatus orderStatus;
        PaymentStatus paymentStatus;
        Employee employee;
    }

    event CreateOrderEvent(
        uint256 id,
        string name,
        address creator,
        uint256 payment,
        OrderStatus orderStatus,
        PaymentStatus paymentStatus,
        Employee employee
    );

    event UpdateOrderEvent(
        uint256 id,
        string name,
        address creator,
        uint256 payment,
        OrderStatus orderStatus,
        PaymentStatus paymentStatus,
        Employee employee
    );

    event DeleteOrderEvent(
        uint256 id,
        address creator
    );

    event SaveTokenTransaction(
        address from,
        address to,
        uint256 amount
    );


    uint256 public currentId = 1;
    address private contractOwner;

    mapping (uint => Order) public store;

    constructor() ERC20("MyToken", "MTK"){
        contractOwner = msg.sender;
        _mint(msg.sender, 100);
    }
    
    modifier onlyOwner(uint256 id){
        require(store[id].creator == msg.sender, "You're not owner");
        _;
    }
    modifier idGuard(uint256 id){
        require(id < currentId && id > 0, "Not valid id");
        _;
    }

    function buyTokens() external payable returns(Response memory) {
        require(msg.value >= TOKENS_COST, "Not enough money");
        uint256 tokenCount = msg.value / TOKENS_COST;
        uint256 change = msg.value - (tokenCount * TOKENS_COST);

        _mint(msg.sender, tokenCount * TOKENS_GIVEN);

        if(change > 0){
            payable(msg.sender).transfer(change);
        }

        return Response({statusCode: 200}); //TODO: Is useable?
    }

    function createOrder(string memory name, uint256 payment) public returns(Response memory) {
        require(balanceOf(msg.sender) >= payment, "Not enough money");

        _transfer(msg.sender, contractOwner, payment);

        store[currentId] = Order(
            currentId,
            name,
            msg.sender,
            payment,
            OrderStatus.Open,
            PaymentStatus.Paid,
            Employee(address(0))
        );

        emit CreateOrderEvent(
            currentId,
            name,
            msg.sender,
            payment,
            OrderStatus.Open,
            PaymentStatus.Paid,
            Employee(address(0))
        );

        emit SaveTokenTransaction(
            msg.sender,
            contractOwner,
            payment
        );

        currentId++;

        return Response({statusCode: 200});
    }

    function acceptOrder(uint256 orderId) public idGuard(orderId) returns(Response memory){
        require(store[orderId].creator != msg.sender, "You can't accept own order");

        require(store[orderId].orderStatus == OrderStatus.Open, "Order is already handeled");
        require(store[orderId].employee.addr == address(0), "Order is already handeled");

        store[orderId].employee.addr = address(msg.sender);
        store[orderId].orderStatus = OrderStatus.Processing;

        emit UpdateOrderEvent(
            orderId,
            store[orderId].name,
            store[orderId].creator,
            store[orderId].payment,
            store[orderId].orderStatus,
            store[orderId].paymentStatus,
            store[orderId].employee
        );

        return Response({statusCode: 200});
    }

    function completeOrder(uint256 orderId) public idGuard(orderId) returns(Response memory){
        require(store[orderId].orderStatus == OrderStatus.Processing, "Order is not handeled yet");
        require(store[orderId].employee.addr == msg.sender, "You not working on that order");

        store[orderId].orderStatus = OrderStatus.Done;

        emit UpdateOrderEvent(
            orderId,
            store[orderId].name,
            store[orderId].creator,
            store[orderId].payment,
            store[orderId].orderStatus,
            store[orderId].paymentStatus,
            store[orderId].employee
        );

        return Response({statusCode: 200});
    }

    function submitOrder(uint256 orderId) public 
        onlyOwner(orderId) 
        idGuard(orderId) 
        returns(Response memory)
    {
        require(store[orderId].orderStatus != OrderStatus.Open, "Order is not handeled yet");
        require(store[orderId].paymentStatus == PaymentStatus.Paid, "Order is not paid yet");

        _transfer(contractOwner, store[orderId].employee.addr, store[orderId].payment);

        store[orderId].paymentStatus = PaymentStatus.Received;

        emit UpdateOrderEvent(
            orderId,
            store[orderId].name,
            store[orderId].creator,
            store[orderId].payment,
            store[orderId].orderStatus,
            store[orderId].paymentStatus,
            store[orderId].employee
        );

        emit SaveTokenTransaction(
            store[orderId].creator,
            store[orderId].employee.addr,
            store[orderId].payment
        );


        return Response({statusCode: 200});
    }

    function deleteOrder(uint256 orderId) public
        onlyOwner(orderId)
        idGuard(orderId)
        returns(Response memory) 
    {
        if(store[orderId].paymentStatus == PaymentStatus.Paid){
            _transfer(contractOwner, msg.sender, store[orderId].payment);
        }

        delete store[orderId];

        emit DeleteOrderEvent(orderId, store[orderId].creator);

        return Response({statusCode: 200});
    }
}