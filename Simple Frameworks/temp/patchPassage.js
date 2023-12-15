
(async() => {
	console.log('patchPassage.js')
	alert('running patchPassage.js')

	const patchedPassage = {}

	//一些需要特殊处理的location Passage
	const locationPassage = {
		'PassageHeader':[
			{
				src:"<<unset $bypassHeader>>",
				to:"<<unset $bypassHeader>>\n<<iModHeader>><div id='headerPopUp'></div>"
			}
		],
		'PassageFooter':[
			{
				src:"<div id=\"gameVersionDisplay\">",
				to:"<<iModFooter>><div id='footerMsg'></div>\n<div id=\"gameVersionDisplay\">"
			}
		],
		'StoryCaption':[
			{
				src:'<div id="sidebar-look-description">',
				applybefore:'<<ModCaptionDescription>>\n\t\t\t'
			},
			{
				src:'<<allurecaption>>',
				applybefore:'<<ModStatusBar>>\n\t\t\t'
			},
			{
				src:'<</button>>\n\t\t\t<div class="sidebarButtonSplit">',
				to:'<</button>>\n\t\t\t<<ModMenuBig>>\n\t\t\t<div class="sidebarButtonSplit">',
			},
			{
				src:'</div>\n\t\t\t<div class="sidebarButtonSplit">',
				to:'</div>\n\t\t\t<div class="sidebarButtonSplit"><<ModMenuSmall>></div>\n\t\t\t<div class="sidebarButtonSplit">'
			}
		]
		,
		'Adult Shop':[
			{
				src: "\t<br><br>\n<</if>>\n\n<<if $stress",
				to: "\t<br><br>\n<</if>>\n\n<div id=\"addAfterMsg\"></div><<BeforeLinkZone>>\n\n<<if $stress"
			}
		],
		'Brothel':[
			{
				src: '<<if $brotheljob is 1>>',
				applybefore: '\n<div id=\"addAfterMsg\"></div>\n<<BeforeLinkZone>>\n'
			},
		],
		'Asylum Cell':[
			{
				src:'<<effects>>',
				applyafter:'<div id="addAfterMsg"></div>\n'
	
			},
			{
				srcgroup:'<<roomoptions>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			},
			{
				srcgroup:'<<link [[Settings|Asylum Settings]]>><</link>>',
				applybefore:'<<ExtraLinkZone>>\n'
			},
			{
				srcgroup:'<<link [[设置|Asylum Settings]]>><</link>>',
				applybefore:'<<ExtraLinkZone>>\n'
			}
		],
		'Asylum':[
			{
				src:'<<effects>>',
				applyafter:'<div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<asylumicon  "cell">>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			},
			{
				src:'<<asylumicon "door">>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			},
			{
				src:'<<if $exposed gte 1>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Eden Cabin':[
			{
				src:'<<if ($edenfreedom is 2 and $edendays lt 8) or ($edenfreedom is 1 and $edendays lt 2)>>',
				applybefore:'<div id="addAfterMsg"></div>\n'
			},
			{
				srcgroup:'<<if Time.monthName is "November" and $edenprepare is 1>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			},
			{
				src:'<<bedicon "eden">><<link',
				applybefore:'\n<<BeforeLinkZone>>\n'
			},
			{
				src:'<<foodicon "pancakes">><<link',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Churchyard':[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n'
			},
			{
				src:'<<foresticon "churchyard">>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Forest':[
			{
				src:'<<if $forest lte 0>>',
				applybefore:'<div id="addAfterMsg"></div>\n'
			},
			{
				srcgroup:'<<forestdeeper>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Lake Shore':[
			{
				src:'<<if $exposed gte 1 and $laketeenspresent is 1>>',
				applybefore:'<div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<mirroricon>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Lake Bus':[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				src:'<<if $exposed lte 0>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Lake Waterfall':[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				src:'<<lakereturnjourney>>',
				applyafter:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Lake Fishing Rock':[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				src:'<<lakereturnjourney>>',
				applyafter:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Lake Firepit':[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				src:'<<lakereturnjourney>>',
				applyafter:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Lake Campsite':[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				src:'<<lakereturnjourney>>',
				applyafter:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Lake Shallows':[
			{
				src:'<<if $stress gte $stressmax and !$possessed>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<lakereturnjourney>>',
				applyafter:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Lake Shallows Ice':[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				src:'<<lakereturnjourney>>',
				applyafter:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Lake Depths':[
			{
				src:'<<if $stress gte $stressmax and !$possessed>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<swimicon>><<link',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Lake Depths Ice':[
			{
				src:'<<if $stress gte $stressmax and !$possessed>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<if $nextPassageCheck',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Tentacle Plains':[
			{
				src:'<<tentaclewolf>>',
				applyafter:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<if $tentnorth is 0 and $tenteast is 0>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Wolf Cave':[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				src:'<<if $wolfcavedig gte 13>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			},
			{
				src:'<<link [[Settings|',
				applybefore:'\n<<ExtraLinkZone>>\n'
			},
			{
				src:'<<link [[设置|',
				applybefore:'\n<<ExtraLinkZone>>\n'
			}
		],
		'Wolf Cave Clearing':[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				src:'<<if $halloweenWolves and $wolfstate is "cave">>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Bird Tower':[
			{
				src:'<<endevent>>',
				applyafter:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<if $leftarm is "bound" or $rig',
				applybefore:'\n<<BeforeLinkZone>>\n'
			},
			{
				src:'<<if $syndromebird is 1>>',
				applybefore:'\n<<ExtraLinkZone>>\n'
			}
		],
		'Coast Path':[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n<<BeforeLinkZone>>\n',
			}
		],
		'Coast Path Farmland':[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n<<BeforeLinkZone>>\n',
			}
		],
		'Estate':[
			{
				src: '<<ind>><<link',
				applybefore:'<div id="addAfterMsg"></div>\n<<BeforeLinkZone>>\n'
			}
		],
		'Farmland':[
			{
				src:'<<if $stress gte $stressmax>>',
				applybefore:'<div id="addAfterMsg"></div>\n<<BeforeLinkZone>>\n'
			},
		],
		'Farm Shed':[
			{
				src:'<<ind>><<link',
				applybefore:'<div id="addAfterMsg"></div>\n<<BeforeLinkZone>>\n'
			},
		],
		'Farm Shave':[
			{
				src:'<<if $pblevel gte',
				applybefore:'<div id="addAfterMsg"></div>\n<<BeforeLinkZone>>\n'
			},
		],
		'Farm Cottage':[
			{
				src:'<<if $farm.build_finished.includes("nursery")>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				srcgroup:'<<farm_cottage_options>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Farm Bedroom':[
			{
				src:'<<if $stress gte $stressmax and !$possessed>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<if !($earSlime.event and $earSlime.noSleep)>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			},
			{
				src:'<<link [[Settings|',
				applybefore:'\n<<ExtraLinkZone>>\n'
			},
			{
				src:'<<link [[设置|',
				applybefore:'\n<<ExtraLinkZone>>\n'
			}
		],
		'Farm Alex Bedroom':[
			{
				src:'<<if $stress gte $stressmax and !$possessed>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<if playerIsPregnant() and ',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Meadow':[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				src:'<<relaxicon>>',
				applybefore:'\n<<BeforeLinkZone>>\n'
			}
		],
		'Livestock Cell':[
			{
				src:'<<if isPlayerNonparasitePregnancyEnding()>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<else>>\n\t<<link',
				to:'<<else>>\n\t<<BeforeLinkZone>>\n<<link',
			},
			{
				src:'<<link [[Settings',
				applybefore:'\n<<ExtraLinkZone>>\n',
			
			}
		],
		'Livestock Field':[
			{
				src:'<<if isPlayerNonparasitePregnancyEnding()>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				src:'<<farmicon "grass">>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Moor':[
			{
				src:'<<if $stress gte $stressmax>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n'
			},
			{
				src:'\t<<if $moor gte 100>>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Castle':[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				src:'<<if $harpy gte 6 ',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Arcade':[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				src:'<<if Time.hour is 21>>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			},
		],
		'Beach':[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				src:'<<if $exposed lte 0>>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Brothel Dressing Room':[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				src:'<<wardrobeicon>>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			},
			{
				src:'<<link [[Settings',
				applybefore:'\n<<ExtraLinkZone>>\n',
			},
			{
				src:'<<link [[设置',
				applybefore:'\n<<ExtraLinkZone>>\n',
			}
		],
		'Bus':[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br><<BeforeLinkZone>>\n',
			}
		],
		'Bus Station':[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				src:'<<if $exposed gte 1>>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Ocean Breeze':[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				src:'<<if $openinghours is 1 and $exposed',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Elk Compound':[
			{
				src:'<<if $stress gte $stressmax>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<if $danger lte',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Dance Studio':[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				src:'<<if $openinghours is 1 and $exposed lt 1>>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Docks':[
			{
				src:'<<if $arousal gte $arousalmax>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<if $robindebtevent gte 1 and',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Flats':[
			{
				src:'<<if $stress gte $stressmax and !$possessed>>',
				applybefore:'\n<div id="addAfterMsg"></div>\n',
			},
			{
				src:'        <<if Time.dayState is "night">>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Bedroom':[
			{
				src:"<<set _desk to Furniture.get('desk')>>",
				applybefore:'\n<div id="addAfterMsg"></div>\n',
			},
			{
				src:'<<deskText "icon">>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			},
			{
				src:'<<link [[Settings',
				applybefore:'\n<<ExtraLinkZone>>\n',
			},
			{
				src:'<<link [[设置',
				applybefore:'\n<<ExtraLinkZone>>\n',
			}
		],
		'Bathroom':[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				src:'<<if $leftarm is "bound" and $rightarm is "bound">>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		"Orphanage":[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				src:'<if $police_hack is 2 and',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Orphanage Ward':[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			{
				srcgroup:'<<orphanageWardOptions>>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Storm Drain Entrance':[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n<<BeforeLinkZone>>\n',
			}
		],
		'Hospital front':[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			
			{
				src:'<<getinicon>><<link',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Hospital Foyer':[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			
			{
				src:'<<if $exposed gte 1>>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Trash':[
			{
				src:'<br><br>',
				to:'<br><div id="addAfterMsg"></div><br>\n',
			},
			
			{
				src:'<<eventstrash>>\n<<else>>',
				applyafter:'\n<<BeforeLinkZone>>\n',
			}
		],
		'Museum':[
			{
				src:'<<if $arousal gte $arousalmax>>',
				applybefore:'<div id="addAfterMsg"></div>\n',
			},
			
			{
				src:'<<if $museumhorseintro is 0>>',
				applybefore:'\n<<BeforeLinkZone>>\n',
			}
		]
	}
	
	const widgetPassage = {
		'Characteristics':[
			{
				src:'<<characteristic-box _housekeepingConfig>>',
				applyafter:'\n<<ModSkillsBox>>\n',
			},
			{
				src:'<<bodywriting>>',
				applyafter:'\n<<ModCharaDescription>>\n'
			}
		],
		'overlayReplace':[
			{
				src:'</div>\n\t<<closeButton>>\n<</widget>>\n\n<<widget \"titleSaves\">>',
				to:`\t\t<<button lanSwitch('Mods', '模组设置')>>\n\t\t<<toggleTab>>\n\t\t<<replace #customOverlayContent>><<iModsOptions>><</replace>>\n\t\t<</button>>\n\n</div>\n\t<<closeButton>>\n<</widget>>\n\n<<widget "titleSaves">>`
			}
		],
		'Widgets variablesStatic':[
			{
				src:"<</widget>>",
				to:"<<iModInit>>\n\n<</widget>>",
			}
		],
	
	}
	
	//能批处理的批处理。街道和地点，以及战斗场景
	function patchScene(passage, title){
		let source = passage.content
	
		if(locationPassage[title]){
			locationPassage[title].forEach((set)=>{
				if(set.src){
					if(set.to){
						source = source.replace(set.src, set.to)
					}
					else if(set.applyafter){
						source = source.replace(set.src, set.src + set.applyafter)
					}
					else if(set.applybefore){
						source = source.replace(set.src, set.applybefore + set.src)
					}
				}
				if(set.srcgroup){
					if(set.to){
						source = source.split(set.srcgroup).join(set.to)
					}
					else if(set.applyafter){
						source = source.split(set.srcgroup).join(set.srcgroup + set.applyafter)
					}
					else if(set.applybefore){
						source = source.split(set.srcgroup).join(set.applybefore + set.srcgroup)
					}
				}
			})
			passage.content = source
			patchedPassage[title] = 1
	
			return passage
		}
	
		if(source.includes('<<if $options.mapTop is true>>')){
			source = source.replace('<<if $options.mapTop is true>>', '<<BeforeLinkZone>>\n<<if $options.mapTop is true>>')
			passage.content = source
		}
	
		if(source.includes('<<streeteffects>>')){
			source = source.replace('<<streeteffects>>', '<<streeteffects>>\n<div id=\"addAfterMsg\"></div>')
			patchedPassage[title] = 1
		}
	
	
		if(source.includes('<<drainlinks>>')){
			source = source.replace('<<drainlinks>>', '<<BeforeLinkZone>>\n<<drainlinks>>')
			passage.content = source
		}
	
		if(source.includes('<<island_tide_options>>')){
			source = source.replace('<<island_tide_options>>', '<<BeforeLinkZone>>\n<<island_tide_options>>')
			passage.content = source
		}
	
		if(source.includes('<<stall_actions>>')){
			source = source.replace('<<stall_actions>>', '<<BeforeLinkZone>>\n<<stall_actions>>')
			passage.content = source
		}
	
		if(source.includes('<<stateman>>')){
			source = source.replace('<<stateman>>', '<div id="addAfterMsg"></div>')
			passage.content = source
			patchedPassage[title] = 1
		}
	
		return passage
	}
	
	//简单粗暴的批量脚本，在对应位置增加文本区域。
	function patchPassage(passage, title){
		let source = passage.content
	
		//处理过的就跳过
		if(patchedPassage[title]) return passage;
		if(source.includes('<<effects>>' === false || patchedPassage[title]) == 1){
			return passage
		}
	
		//一些额外的位置
		let txt = source.split('\n')
	
		let IF = [], endIFZone = false, inIFZone = false, patch=false
		for(let i=0; i<txt.length; i++){
			let line = txt[i]
			let next = txt[i+1]
			let next2 = txt[i+2]
	
			if(line.includes('<<if')){
				IF.push(i)
				inIFZone = true
				endIFZone = false
			}
			if(line.includes('<</if')){
				IF.pop()
				
				if(IF.length == 0 ){
					endIFZone = true
					inIFZone = false
				}
			}
	
			if(line.includes('<br><br>') && (next?.includes('<<link')||next2?.includes('<<link')) && !endIFZone && !inIFZone ){
				txt[i] = txt[i].replace('<br><br>', `<br>\n<div id='addAfterMsg'></div><br>`)
				patch = true
				break
			}
			else if(line.includes('<br><br>') && (next?.includes('<<link')||next2?.includes('<<link')) && endIFZone ){
				txt[i] = txt[i].replace('<br><br>', `<br>\n<div id='addAfterMsg'></div><br>`)
				patch = true
				break
			}
		}
	
		txt = txt.join('\n')
	
		if(!patch && txt.includes('<br><br>')){
			if(txt.includes('<<if') === false && txt.count('<br><br>') > 1 ){
				txt = txt.split('<br><br>')
				txt[txt.length-1] = txt[txt.length-1]  + "\n<div id='addAfterMsg'></div>"
				txt.join('<br><br>')
	
			}
			else{
				txt.replace('<br><br>', `<br>\n<div id='addAfterMsg'></div><br>`)
			}
			patch = true
		}
	
		if(!patch){
			txt.replace('<<effects>>', "<<effects>><div id='addAfterMsg'></div>")
		}
	
		if(patch){
			passage.content = txt
		}
	
		return passage
	}
	
	//简单粗暴的批量脚本，在对应的widget区最后加个钩子
	function patchWidget(passage, title){
		if(!widgetPassage[title]) return;
	
		widgetPassage[title].forEach((set)=>{
			if(set.src){
				if(set.to){
					source = source.replace(set.src, set.to)
				}
				else if(set.applyafter){
					source = source.replace(set.src, set.src + set.applyafter)
				}
				else if(set.applybefore){
					source = source.replace(set.src, set.applybefore + set.src)
				}
			}
			if(set.srcgroup){
				if(set.to){
					source = source.split(set.srcgroup).join(set.to)
				}
				else if(set.applyafter){
					source = source.split(set.srcgroup).join(set.srcgroup + set.applyafter)
				}
				else if(set.applybefore){
					source = source.split(set.srcgroup).join(set.applybefore + set.srcgroup)
				}
			}
		})
	
		passage.content = source
	
		return passage
	}
	
	function patchPasssage2(passage, title){
	
		if(passage.tag.includes('widget')){
			patchWidget(passage, title)
		}
		else{
			patchScene(passage, title)
			patchPassage(passage, title)		
		}
	
	}
	
	async function simpleWidgetInit(passageData){
		let data = passageData.get('Simple Widget Frameworks')
		let html = ''
		html += await simpleFrameworks.createMicroWidgets();
		html += simpleFrameworks.createModInitMacro();
		data.content = html
	
		passageData.set('Simple Widget Frameworks', data)
	
	}
	
	
	async function afterPatchModToGame() {
	
		const modSC2DataManager = window.modSC2DataManager
		const addonTweeReplacer = window.addonTweeReplacer
	
		const oldSCdata = modSC2DataManager.getSC2DataInfoAfterPatch()
		const SCdata = oldSCdata.cloneSC2DataInfo()
		const passageData = SCdata.passageDataItems.map
	
		await simpleWidgetInit(passageData)
	
		for(const [title, passage] of passageData){
			try{
				await patchPasssage2(passage, title)
			}
			catch(e){
				console.error(e);
				addonTweeReplacer.logger.error(`PatchScene: ${title} ${e?.message ? e.message : e}`);
			}
		}
	
		SCdata.passageDataItems.back2Array();
		addonTweeReplacer.gModUtils.replaceFollowSC2DataInfo(SCdata, oldSCdata);

	}
	
	window.SimplePatchPassage = {
		patchedPassage,
		locationPassage,
		patchScene,
		patchPassage,
		afterPatchModToGame
	}
	
	
	await afterPatchModToGame()
	

    // 这里的返回值会被JsPreloader接收，如果返回的是一个Promise，则会等待这个Promise执行完毕后再继续执行下一个脚本，或继续初始化引擎
    return Promise.resolve("patchPassage.js ok");
})();