<?php
/**
 *
 *  FiveMES by Akkariin
 *
 */
if(PHP_SAPI !== 'cli') {
	exit;
}

// 储存服务器 ID => 连接 ID
$clientStorage = new Swoole\Table(2048);
$clientStorage->column('id', swoole_table::TYPE_INT, 4);
$clientStorage->column('client', swoole_table::TYPE_INT, 4);
$clientStorage->create();

// 储存连接 ID => 服务器 ID
$fidStorage = new Swoole\Table(2048);
$fidStorage->column('id', swoole_table::TYPE_INT, 4);
$fidStorage->column('client', swoole_table::TYPE_INT, 4);
$fidStorage->create();

$server = new swoole_websocket_server("0.0.0.0", 9230);
$server->clientStorage = $clientStorage;
$server->fidStorage = $fidStorage;

$server->on('open', function (swoole_websocket_server $server, $request) {
    echo "Client {$request->fd} connected\n";
});

$server->on('message', function (swoole_websocket_server $server, $frame) {
	$rawdata = $frame->data;
	$data = json_decode($rawdata, true);
	if($data) {
		if(isset($data['action'])) {
			switch($data['action']) {
				case 'setclient':
					if(isset($data['value']) && preg_match("/^[0-9]{1,5}$/", $data['value'])) {
						if(!$server->clientStorage->get(Intval($data['value']))) {
							$server->clientStorage->set(Intval($data['value']), Array('client' => $frame->fd));
							$server->fidStorage->set($frame->fd, Array('client' => Intval($data['value'])));
							echo "Client {$frame->fd} Connect to game ID {$data['value']}\n";
						}
					}
					break;
				case 'setspeed':
					if(isset($data['sid']) && preg_match("/^[0-9]{1,5}$/", $data['sid'])) {
						$fd = $server->clientStorage->get(Intval($data['sid']), 'client');
						if($fd) {
							if(isset($data['speed']) && isset($data['gear']) && isset($data['rpm'])) {
								$rs = $server->push($fd, json_encode(Array(
									'action' => 'update',
									'speed' => Floatval($data['speed']),
									'gear' => Intval($data['gear']),
									'rpm' => Floatval($data['rpm']),
									'IL' => Intval($data['IL']),
									'Handbrake' => $data['Handbrake'],
									'LS_r' => $data['LS_r'],
									'LS_o' => $data['LS_o'],
									'LS_h' => $data['LS_h']
								)));
								if(!$rs) {
									$fid = $server->fidStorage->get($fd, 'client');
									$server->fidStorage->del($fd);
									$server->clientStorage->det($fid);
								}
							}
						}
					}
					break;
				default:
					// Undefined action
			}
		}
	}
});

$server->on('close', function (swoole_websocket_server $server, $fd) {
	echo "Client {$fd} offline\n";
	$fid = $server->fidStorage->get($fd, 'client');
	if($fid) {
		$server->fidStorage->del($fd);
		$server->clientStorage->del($fid);
	}
	
});
$server->start();

function emptyStr($str) {
	if(empty($str) || $str == null) {
		return "";
	} else {
		return $str;
	}
}

function getBoolean($data) {
	return $data == "true";
}
