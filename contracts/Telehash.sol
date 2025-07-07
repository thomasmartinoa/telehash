// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Telehash {
    struct DataEvent {
        string dataHash;
        string greenfieldCID;
        string metadata;
        uint256 timestamp;
    }

    struct CommandLog {
        string command;
        uint256 timestamp;
    }

    mapping(address => string) public satellites;
    mapping(address => DataEvent[]) public dataLogs;
    mapping(address => CommandLog[]) public commandLogs;

    event SatelliteRegistered(address indexed sat, string name);
    event DataUploaded(address indexed sat, string hash, string cid);
    event CommandLogged(address indexed sat, string command);

    function registerSatellite(string calldata name) external {
        require(bytes(satellites[msg.sender]).length == 0, "Already registered");
        satellites[msg.sender] = name;
        emit SatelliteRegistered(msg.sender, name);
    }

    function uploadData(string calldata dataHash, string calldata cid, string calldata metadata) external {
        require(bytes(satellites[msg.sender]).length > 0, "Satellite not registered");
        dataLogs[msg.sender].push(DataEvent(dataHash, cid, metadata, block.timestamp));
        emit DataUploaded(msg.sender, dataHash, cid);
    }

    function logCommand(string calldata command) external {
        require(bytes(satellites[msg.sender]).length > 0, "Satellite not registered");
        commandLogs[msg.sender].push(CommandLog(command, block.timestamp));
        emit CommandLogged(msg.sender, command);
    }

    function getDataLogs(address sat) external view returns (DataEvent[] memory) {
        return dataLogs[sat];
    }

    function getCommandLogs(address sat) external view returns (CommandLog[] memory) {
        return commandLogs[sat];
    }
}
